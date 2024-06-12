using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using Reservation.API.Data;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Auth.Request;
using Reservation.API.Models.DTO.Auth.Response;
using Reservation.API.Models.DTO.Email;
using Reservation.API.Serivces.Email;
using System.Security.Claims;
using System.Security.Policy;
using System.Text.Encodings.Web;
using System.Text;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using NuGet.Common;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Reservation.API.Models.Request;
using MimeKit;

namespace Reservation.API.Serivces.Auth
{
    public class AuthService(UserManager<ApplicationUser> userManager,
                                SignInManager<ApplicationUser> signInManager,
                                RoleManager<IdentityRole> roleManager,
                                ApplicationDbContext applicationDbContext,
                                TokenSettings tokenSettings,
                                IEmailService emailService,
                                IWebHostEnvironment webHostEnvironment
        ) : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
        private readonly TokenSettings _tokenSettings = tokenSettings;
        private readonly ApplicationDbContext _context = applicationDbContext;
        private readonly IEmailService _emailServicee = emailService;
        private readonly IWebHostEnvironment _webHostEnvironment = webHostEnvironment;

        private const string UserRole = "USER";

        public async Task<AppResponse<bool>> RegisterAsync(UserRegisterRequest request, string host)
        {
            var user = new ApplicationUser()
            {
                UserName = request.Email,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                PhoneNumberConfirmed = true,
                JoinedDate = DateTime.UtcNow,
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return new AppResponse<bool>().SetErrorResponse(GetRegisterErrors(result));

            }
            await _userManager.AddToRoleAsync(user, UserRole);

            await SendVerification(request.Email, user);

            return new AppResponse<bool>().SetSuccessResponse(true, "confirm", "Bạn đã đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.");
        }

        
        private async Task<bool> SendVerification(string email, ApplicationUser user)
        {
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            string url = $"{tokenSettings.Audience}/confirm-email";
            var param = new Dictionary<string, string>()
            {
                { "code", code },
                { "email", email },
            };

            var callbackUrl = new Uri(QueryHelpers.AddQueryString(url, param));

            var body = new BodyBuilder();
            body.HtmlBody = _emailServicee.GetEmailTemplate("confirmEmail.html").Replace("[LINK]", callbackUrl.ToString());
            
            var emailContent = new EmailContent(body.ToMessageBody())
            {
                Subject = "Xác nhận email tại ThueNguoiYeu.me",
                Content = $"Please confirm your account by <a href='{callbackUrl}'>clicking here</a>.",
                ToEmail = email,
                ToName = email
            };

            return _emailServicee.SendMail(emailContent);
        }

        public async Task<AppResponse<bool>> LogoutAsync(ClaimsPrincipal user)
        {
            if (user.Identity?.IsAuthenticated ?? false)
            {
                var username = user.Claims.First(x => x.Type == "userName").Value;
                var appUser = _context.Users.First(x => x.UserName == username);
                if (appUser != null) { await _userManager.UpdateSecurityStampAsync(appUser); }
                return new AppResponse<bool>().SetSuccessResponse(true);
            }
            return new AppResponse<bool>().SetSuccessResponse(true);
        }

        public async Task<AppResponse<UserLoginResponse>> LoginAsync(UserLoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return new AppResponse<UserLoginResponse>().SetErrorResponse("email", "Email hasn't been registered !");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, true);

            if (result.Succeeded)
            {
                var token = await GenerateUserToken(user);
                return new AppResponse<UserLoginResponse>().SetSuccessResponse(token);
            }

            var emailConfirmed = await _userManager.IsEmailConfirmedAsync(user);

            if(emailConfirmed) 
            {
                return new AppResponse<UserLoginResponse>().SetErrorResponse("password", result.ToString(), 403);
            }

            await SendVerification(request.Email, user);

            return new AppResponse<UserLoginResponse>().SetErrorResponse("account", "Bạn chưa kích hoạt tài khoản. Vui lòng kiểm tra email để kích hoạt!", 401);

        }

        private static Dictionary<string, string[]> GetRegisterErrors(IdentityResult result)
        {
            var errorDictionary = new Dictionary<string, string[]>(1);

            foreach (var error in result.Errors)
            {
                string[] newDescriptions;

                if (errorDictionary.TryGetValue(error.Code, out var descriptions))
                {
                    newDescriptions = new string[descriptions.Length + 1];
                    Array.Copy(descriptions, newDescriptions, descriptions.Length);
                    newDescriptions[descriptions.Length] = error.Description;
                }
                else
                {
                    newDescriptions = [error.Description];
                }

                errorDictionary[error.Code] = newDescriptions;
            }

            return errorDictionary;
        }

        private async Task<UserLoginResponse> GenerateUserToken(ApplicationUser user)
        {
            var token = TokenUtil.GetToken(_tokenSettings, user, GetClaims(user));
            await _userManager.RemoveAuthenticationTokenAsync(user, "REFRESHTOKENPROVIDER", "RefreshToken");
            var refreshToken = await _userManager.GenerateUserTokenAsync(user, "REFRESHTOKENPROVIDER", "RefreshToken");
            await _userManager.SetAuthenticationTokenAsync(user, "REFRESHTOKENPROVIDER", "RefreshToken", refreshToken);
            return new UserLoginResponse() { AccessToken = token, RefreshToken = refreshToken };
        }

        private List<Claim> GetClaims(ApplicationUser user)
        {
            var claims = (from ur in _context.UserRoles
                          where ur.UserId == user.Id
                          join r in _context.Roles on ur.RoleId equals r.Id
                          join rc in _context.RoleClaims on r.Id equals rc.RoleId
                          select rc)
              .Where(rc => !string.IsNullOrEmpty(rc.ClaimValue) && !string.IsNullOrEmpty(rc.ClaimType))
              .Select(rc => new Claim(rc.ClaimType!, rc.ClaimValue!))
              .Distinct()
              .ToList();

            var roleClaims = (from ur in _context.UserRoles
                              where ur.UserId == user.Id
                              join r in _context.Roles on ur.RoleId equals r.Id
                              select r)
              .Where(r => !string.IsNullOrEmpty(r.Name))
              .Select(r => new Claim("role", r.Name!))
              .Distinct()
              .ToList();

            if(roleClaims.Count == 0)
            {
                roleClaims.Add(new Claim("role", "USER"));
            }

            var collaboratorIds = (from cl in _context.Collaborators
                                 where cl.ApplicationUserId == user.Id
                                 select cl)
                .Select(r => new Claim("collaboratorId", r.Id.ToString()!))
                .Distinct()
                .ToList();

            if (collaboratorIds.Count == 0)
            {
                collaboratorIds.Add(new("collaboratorId", Guid.Empty.ToString()));
            }
                              
            claims.AddRange(roleClaims);
            claims.AddRange(collaboratorIds);

            return claims;
        }

        public async Task<AppResponse<string>> EmailConfirm(string email, string code)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null)
            {
                return new AppResponse<string>().SetErrorResponse("user", "User not found! Something goes wrong please check it again !", 404);
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (!result.Succeeded)
            {
                return new AppResponse<string>().SetErrorResponse("user", result.ToString(), 404);
            }

            return new AppResponse<string>().SetSuccessResponse(email, "success", "Congratulations ! Your email has been confirmed!");
        }

        public async Task<AppResponse<UserLoginResponse>> UserRefreshTokenAsync(UserLoginResponse request)
        {
            var principal = TokenUtil.GetPrincipalFromExpiredToken(_tokenSettings, request.AccessToken);
            if (principal == null || principal.FindFirst("UserName")?.Value == null)
            {
                return new AppResponse<UserLoginResponse>().SetErrorResponse("email", "User not found");
            }

            var user = await _userManager.FindByNameAsync(principal.FindFirst("UserName")?.Value ?? "");
            if (user == null)
            {
                return new AppResponse<UserLoginResponse>().SetErrorResponse("email", "User not found");
            }

            if (!await _userManager.VerifyUserTokenAsync(user, "REFRESHTOKENPROVIDER", "RefreshToken", request.RefreshToken))
            {
                return new AppResponse<UserLoginResponse>().SetErrorResponse("token", "Refresh token expired");
            }

            var token = await GenerateUserToken(user);
            return new AppResponse<UserLoginResponse>().SetSuccessResponse(new UserLoginResponse() { AccessToken = token.AccessToken, RefreshToken = token.RefreshToken });
        }

        public async Task<AppResponse<string>> ForgotPasswordAsync(ForgotPasswordRequest request, string path)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                // Do not reveal that the user does not exist or is not confirmed
                return new AppResponse<string>().SetErrorResponse("user", "User not found !");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            string url = $"{tokenSettings.Audience}/reset-password";
            var param = new Dictionary<string, string>()
            {
                { "token", token },
                { "email", request.Email },
            };

            var callbackUrl = new Uri(QueryHelpers.AddQueryString(url, param));

            var emailContent = new EmailContent()
            {
                ToName = request.Email,
                ToEmail = request.Email,
                Subject = "Reset password",
                Content = $"Please reset your password by clicking <a href='{callbackUrl}'>here</a>."
            };
            _emailServicee.SendMail(emailContent);

            return new AppResponse<string>().SetSuccessResponse(token, "", "Please check your email to reset your password!");
        }

        public async Task<AppResponse<string>> ResetPasswordAsync(ResetPasswordRequest model)
        {
            if(string.IsNullOrEmpty(model.Token)|| string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return new AppResponse<string>().SetErrorResponse("", $"null {model.Token} {model.Email}");

            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Do not reveal that the user does not exist
                return new AppResponse<string>().SetErrorResponse("", "User not found!");
            }

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (result.Succeeded)
            {
                return new AppResponse<string>().SetSuccessResponse("Reset password successfully!");
            }

            return new AppResponse<string>().SetErrorResponse("", result.ToString());
        }

        public async Task<AppResponse<IdentityResult>> ChangePasswordAsync(ChangePasswordRequest request)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);

            if(user == null)
            {
                return new AppResponse<IdentityResult>().SetErrorResponse("", "User not found!");
            }

            var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

            if(result.Succeeded)
            {
                return new AppResponse<IdentityResult>().SetSuccessResponse(result);
            }

            var dictResult = new Dictionary<string, string[]>();
            foreach(var item in result.Errors)
            {
                dictResult.Add(item.Code, [item.Description]);
            }

            return new AppResponse<IdentityResult>().SetErrorResponse(dictResult);
        }
    }
}

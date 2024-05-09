using Microsoft.AspNetCore.Identity;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
using System.Security.Claims;

namespace Reservation.Server.Serivces.Auth
{
    public class UserRegisterRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }

    public class UserLoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
    public class UserLoginResponse
    {
        public string AccessToken { get; set; } = "";
        public string RefreshToken { get; set; } = "";
    }

    public class AuthService(UserManager<ApplicationUser> userManager,
                                SignInManager<ApplicationUser> signInManager,
                                RoleManager<IdentityRole> roleManager,
                                ApplicationDbContext applicationDbContext,
                                TokenSettings tokenSettings
        ) : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
        private readonly TokenSettings _tokenSettings = tokenSettings;
        private readonly ApplicationDbContext _context = applicationDbContext;

        public async Task<AppResponse<bool>> RegisterAsync(UserRegisterRequest request)
        {
            var user = new ApplicationUser()
            {
                UserName = request.Email,
                Email = request.Email,

            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                return new AppResponse<bool>().SetSuccessResponse(true);
            }
            else
            {
                return new AppResponse<bool>().SetErrorResponse(GetRegisterErrors(result));
            }
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

        public async Task<AppResponse<bool>> LogoutAsync(ClaimsPrincipal user)
        {
            if (user.Identity?.IsAuthenticated ?? false)
            {
                var username = user.Claims.First(x => x.Type == "UserName").Value;
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
                return new AppResponse<UserLoginResponse>().SetErrorResponse("email", "Email not found");
            }
            else
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, true);

                if (result.Succeeded)
                {
                    var token = await GenerateUserToken(user);
                    return new AppResponse<UserLoginResponse>().SetSuccessResponse(token);
                }
                var emailConfirmed = await _userManager.IsEmailConfirmedAsync(user);

                return emailConfirmed ? new AppResponse<UserLoginResponse>().SetErrorResponse("password", result.ToString(), 403) 
                    : new AppResponse<UserLoginResponse>().SetErrorResponse("account", "Please check email and do confirmation!", 401);

            }

        }

        private async Task<UserLoginResponse> GenerateUserToken(ApplicationUser user)
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
              .Select(r => new Claim(ClaimTypes.Role, r.Name!))
              .Distinct()
              .ToList();

            claims.AddRange(roleClaims);

            var token = TokenUtil.GetToken(_tokenSettings, user, claims);
            await _userManager.RemoveAuthenticationTokenAsync(user, "REFRESHTOKENPROVIDER", "RefreshToken");
            var refreshToken = await _userManager.GenerateUserTokenAsync(user, "REFRESHTOKENPROVIDER", "RefreshToken");
            await _userManager.SetAuthenticationTokenAsync(user, "REFRESHTOKENPROVIDER", "RefreshToken", refreshToken);
            return new UserLoginResponse() { AccessToken = token, RefreshToken = refreshToken };
        }
    }
}

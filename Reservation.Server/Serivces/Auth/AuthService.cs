using Microsoft.AspNetCore.Identity;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;

namespace Reservation.Server.Serivces.Auth
{
    public class UserRegisterRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
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
    }
}

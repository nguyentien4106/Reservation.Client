using Microsoft.AspNetCore.Identity;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Auth.Request;
using Reservation.Domain.Models.DTO.Auth.Response;
using Reservation.Domain.Models.Request.Auth;
using System.Security.Claims;

namespace Reservation.Application.Serivces.Auth
{
    public interface IAuthService
    {
        Task<AppResponse<bool>> RegisterAsync(UserRegisterRequest request, string host);

        Task<AppResponse<string>> EmailConfirm(string email, string code);

        Task<AppResponse<bool>> LogoutAsync(ClaimsPrincipal user);

        Task<AppResponse<UserLoginResponse>> LoginAsync(UserLoginRequest request);

        Task<AppResponse<UserLoginResponse>> UserRefreshTokenAsync(UserLoginResponse request);

        Task<AppResponse<string>> ForgotPasswordAsync(ForgotPasswordRequest request, string path);

        Task<AppResponse<string>> ResetPasswordAsync(ResetPasswordRequest request);

        Task<AppResponse<IdentityResult>> ChangePasswordAsync(ChangePasswordRequest request);
    }
}

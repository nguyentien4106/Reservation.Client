using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Auth.Request;
using Reservation.Server.Models.DTO.Auth.Response;
using System.Security.Claims;

namespace Reservation.Server.Serivces.Auth
{
    public interface IAuthService
    {
        Task<AppResponse<bool>> RegisterAsync(UserRegisterRequest request, string host);

        Task<AppResponse<string>> EmailConfirm(string email, string code);

        Task<AppResponse<bool>> LogoutAsync(ClaimsPrincipal user);

        Task<AppResponse<UserLoginResponse>> LoginAsync(UserLoginRequest request);

        Task<UserLoginResponse> RegenerateToken(string email);

    }
}

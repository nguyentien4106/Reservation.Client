using Reservation.Server.Models.DTO.Auth;
using System.Security.Claims;

namespace Reservation.Server.Serivces.Auth
{
    public interface IAuthService
    {
        Task<AppResponse<bool>> RegisterAsync(UserRegisterRequest request);

        Task<AppResponse<bool>> LogoutAsync(ClaimsPrincipal user);

        Task<AppResponse<UserLoginResponse>> LoginAsync(UserLoginRequest request);
    }
}

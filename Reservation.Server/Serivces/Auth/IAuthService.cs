using Reservation.Server.Models.DTO.Auth;

namespace Reservation.Server.Serivces.Auth
{
    public interface IAuthService
    {
        Task<AppResponse<bool>> RegisterAsync(UserRegisterRequest request);
    }
}

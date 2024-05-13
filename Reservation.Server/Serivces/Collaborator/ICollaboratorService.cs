using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;

namespace Reservation.Server.Serivces.UserServiceRegister
{
    public interface ICollaboratorService
    {
        Task<AppResponse<ApplicationUser>> GetUserAsync(string email);
    }
}

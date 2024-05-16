using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;

namespace Reservation.Server.Serivces.Home
{
    public interface IHomeService
    {
        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync();
    }
}

using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;

namespace Reservation.Server.Serivces.UserServiceRegister
{
    public interface ICollaboratorService
    {
        Task<AppResponse<string>> GetUserIdAsync(string email);

        Task<AppResponse<CollaboratorDTO>> GetProfileAsync(string id);

        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync();

        Task<AppResponse<CollaboratorDTO>> RegisterAsync(CollaboratorDTO dto);
    }
}

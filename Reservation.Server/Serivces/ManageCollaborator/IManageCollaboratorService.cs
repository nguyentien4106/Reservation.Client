using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;

namespace Reservation.Server.Serivces.ManageCollaborator
{
    
    public interface IManageCollaboratorService
    {
        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(int type);

    }
}

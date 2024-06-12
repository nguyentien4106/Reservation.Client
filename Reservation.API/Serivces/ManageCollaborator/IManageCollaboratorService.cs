using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Collaborator;

namespace Reservation.API.Serivces.ManageCollaborator
{
    
    public interface IManageCollaboratorService
    {
        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(int type);

    }
}

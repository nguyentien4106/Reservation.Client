using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;

namespace Reservation.Application.Serivces.ManageCollaborator
{
    
    public interface IManageCollaboratorService
    {
        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(int type);

    }
}

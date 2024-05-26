using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.DTO.Home;

namespace Reservation.Server.Serivces.UserServiceRegister
{
    public interface ICollaboratorService
    {
        Task<AppResponse<string>> GetUserIdAsync(string email);

        Task<AppResponse<CollaboratorDTO>> GetProfileAsync(Guid? collaboratorId);

        Task<AppResponse<CollaboratorDTO>> GetProfileByEmailAsync(string? email);

        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(int type);

        Task<AppResponse<string>> AddAsync(CollaboratorDTO dto);

        Task<AppResponse<string>> UpdateAsync(CollaboratorDTO dto);

        Task<AppResponse<string>> ChangeStatusAsync(Guid? collaboratorId, int status);

        Task<AppResponse<List<OrderDTO>>> GetRequestsAsync(Guid? collaboratorId);

        Task<AppResponse<OrderDTO>> ComfirmRequestAsync(Guid? requestId, int status);
    }
}

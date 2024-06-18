using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;
using Reservation.Domain.Models.Request.Collaborators;
using Reservation.Domain.Models.ViewModel;

namespace Reservation.Application.Serivces.UserServiceRegister
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

        //Task<AppResponse<List<OrderDTO>>> GetRequestsAsync(Guid? collaboratorId);

        //Task<AppResponse<OrderDTO>> ComfirmRequestAsync(Guid? requestId, int status);

        Task<AppResponse<PagingViewModel<List<CollaboratorDTO>>>> GetAllAsync(GetAllRequest request);

    }
}

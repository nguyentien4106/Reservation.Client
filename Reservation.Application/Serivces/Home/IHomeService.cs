using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;

namespace Reservation.Application.Serivces.Home
{
    public interface IHomeService
    {
        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync();

        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(string city, string district, string sex, int maxAge);

    }
}

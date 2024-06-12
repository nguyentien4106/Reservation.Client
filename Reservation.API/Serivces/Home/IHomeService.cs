using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Collaborator;
using Reservation.API.Models.DTO.Home;

namespace Reservation.API.Serivces.Home
{
    public interface IHomeService
    {
        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync();

        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(string city, string district, string sex, int maxAge);

    }
}

using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.DTO.Home;

namespace Reservation.Server.Serivces.Home
{
    public interface IHomeService
    {
        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync();

        Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(string city, string district, string sex, int maxAge);

        Task<AppResponse<bool>> CreateOrderAsync(OrderDTO request);
    }
}

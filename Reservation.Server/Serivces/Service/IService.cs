using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Service;

namespace Reservation.Server.Serivces.Service
{
    public interface IService
    {
        Task<AppResponse<List<ServiceDTO>>> GetAllAsync();
    }
}

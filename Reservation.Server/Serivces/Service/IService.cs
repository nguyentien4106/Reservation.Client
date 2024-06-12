using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Service;

namespace Reservation.API.Serivces.Service
{
    public interface IService
    {
        Task<AppResponse<List<ServiceDTO>>> GetAllAsync();

        Task<AppResponse<bool>> AddAsync(ServiceDTO dto);
    }
}

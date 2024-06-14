using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Service;

namespace Reservation.Application.Serivces.Service
{
    public interface IService
    {
        Task<AppResponse<List<ServiceDTO>>> GetAllAsync();

        Task<AppResponse<bool>> AddAsync(ServiceDTO dto);
    }
}

using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Home;

namespace Reservation.Application.Serivces.Order
{
    public interface IOrderService
    {
        Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(Guid? collaboratorId);

        Task<AppResponse<OrderDTO>> ComfirmOrderAsync(Guid? requestId, int status);

        Task<AppResponse<bool>> CreateOrderAsync(OrderDTO request);

    }
}

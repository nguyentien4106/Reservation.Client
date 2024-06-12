using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Home;

namespace Reservation.API.Serivces.Order
{
    public interface IOrderService
    {
        Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(Guid? collaboratorId);

        Task<AppResponse<OrderDTO>> ComfirmOrderAsync(Guid? requestId, int status);

        Task<AppResponse<bool>> CreateOrderAsync(OrderDTO request);

    }
}

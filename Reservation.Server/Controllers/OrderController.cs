using Microsoft.AspNetCore.Mvc;
using Reservation.API.Serivces.Order;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Home;

namespace Reservation.API.Controllers
{
    [ApiController]
    public class OrderController(IOrderService service) : ControllerBase
    {
        private readonly IOrderService _orderService = service;

        [HttpGet]
        public async Task<AppResponse<List<OrderDTO>>> GetOrders(Guid? collaboratorId)
        {
            return await _orderService.GetOrdersAsync(collaboratorId);
        }

        [HttpGet]
        public async Task<AppResponse<OrderDTO>> ComfirmOrder(Guid? requestId, int status)
        {
            return await _orderService.ComfirmOrderAsync(requestId, status);
        }

        [HttpPost]
        public async Task<AppResponse<bool>> CreateOrder(OrderDTO request)
        {
            return await _orderService.CreateOrderAsync(request);
        }

    }
}

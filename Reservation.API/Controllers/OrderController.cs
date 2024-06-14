using Microsoft.AspNetCore.Mvc;
using Reservation.Application.Serivces.Order;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Home;
using Microsoft.AspNetCore.Authorization;

namespace Reservation.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize]
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

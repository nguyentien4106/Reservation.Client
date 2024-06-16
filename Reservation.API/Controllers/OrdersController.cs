using Microsoft.AspNetCore.Mvc;
using Reservation.Application.Serivces.Order;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Home;
using Microsoft.AspNetCore.Authorization;

namespace Reservation.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController(IOrderService service) : ControllerBase
    {
        private readonly IOrderService _orderService = service;

        [HttpGet("[action]/{collaboratorId}")]
        public async Task<AppResponse<List<OrderDTO>>> Collaborators([FromRoute]Guid? collaboratorId)
        {
            return await _orderService.GetOrdersAsync(collaboratorId);
        }

        [HttpGet("[action]/{userId}")]
        public async Task<AppResponse<List<OrderDTO>>> Customers([FromRoute] string? userId)
        {
            return await _orderService.GetOrdersAsync(userId);
        }

        [HttpGet("[action]")]
        public async Task<AppResponse<OrderDTO>> Comfirm(Guid? orderId, int status)
        {
            return await _orderService.ComfirmOrderAsync(orderId, status);
        }

        [HttpPost]
        public async Task<AppResponse<bool>> CreateOrder(OrderDTO request)
        {
            return await _orderService.CreateOrderAsync(request);
        }

    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Customer;
using Reservation.Server.Models.DTO.Home;
using Reservation.Server.Serivces.Customer;

namespace Reservation.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CustomerController(ICustomerService customerService) : ControllerBase
    {
        private readonly ICustomerService _customerService = customerService;

        [HttpGet]
        public async Task<AppResponse<List<OrderDTO>>> GetOrders(string applicationUserId)
        {
            return await _customerService.GetOrdersAsync(applicationUserId);
        }

        [HttpPost]
        public async Task<AppResponse<OrderDTO>> AddReview(ReviewDTO review)
        {
            return await _customerService.AddReviewAsync(review);
        }

        [HttpPost]
        public async Task<AppResponse<bool>> CreateOrder(OrderDTO request)
        {
            return await _customerService.CreateOrderAsync(request);
        }
    }
}

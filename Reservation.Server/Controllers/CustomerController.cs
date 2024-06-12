using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Customer;
using Reservation.API.Models.DTO.Home;
using Reservation.API.Models.DTO.Jobs;
using Reservation.API.Serivces.Customer;

namespace Reservation.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CustomerController(ICustomerService customerService) : ControllerBase
    {
        private readonly ICustomerService _customerService = customerService;

        //[HttpGet]
        //public async Task<AppResponse<List<OrderDTO>>> GetOrders(string applicationUserId)
        //{
        //    return await _customerService.GetOrdersAsync(applicationUserId);
        //}

        [HttpPost]
        public async Task<AppResponse<OrderDTO>> AddReview(ReviewDTO review)
        {
            return await _customerService.AddReviewAsync(review);
        }

    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Customer;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Application.Serivces.Customer;

namespace Reservation.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CustomerController(ICustomerService customerService) : ControllerBase
    {
        private readonly ICustomerService _customerService = customerService;

        [HttpPost]
        public async Task<AppResponse<OrderDTO>> AddReview(ReviewDTO review)
        {
            return await _customerService.AddReviewAsync(review);
        }

    }
}

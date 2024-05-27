using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.DTO.Home;
using Reservation.Server.Serivces.Home;

namespace Reservation.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class HomeController(IHomeService homeService) : ControllerBase
    {

        private readonly IHomeService _homeService = homeService;

        [HttpGet]
        public async Task<AppResponse<List<CollaboratorDTO>>> GetAll()
        {
            return await _homeService.GetAllAsync();
        }

        [HttpGet]
        
        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllFilter([FromQuery] string city, string district, string sex, int maxAge)
        {
            return await _homeService.GetAllAsync(city, district, sex, maxAge);
        }

        [HttpPost]
        public async Task<AppResponse<bool>> CreateOrder(OrderDTO request)
        {
            return await _homeService.CreateOrderAsync(request);
        }
    }
}

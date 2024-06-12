using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Collaborator;
using Reservation.API.Models.DTO.Home;
using Reservation.API.Serivces.Home;

namespace Reservation.API.Controllers
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

        //[HttpGet]
        
        //public async Task<AppResponse<List<CollaboratorDTO>>> GetAllFilter([FromQuery] string city, string district, string sex, int orderType)
        //{
        //    return await _homeService.GetAllAsync(city, district, sex, orderType);
        //}

        //[HttpPost]
        //public async Task<AppResponse<bool>> CreateOrder(OrderDTO request)
        //{
        //    return await _homeService.CreateOrderAsync(request);
        //}
    }
}

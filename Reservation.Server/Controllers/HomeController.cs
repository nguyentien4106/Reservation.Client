using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Serivces.Home;

namespace Reservation.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class HomeController(IHomeService homeService) : ControllerBase
    {

        private readonly IHomeService _homeService = homeService;

        [HttpGet]
        public async Task<AppResponse<List<CollaboratorDTO>>> GetAll()
        {
            return await _homeService.GetAllAsync();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Application.Serivces.Home;

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
    }
}

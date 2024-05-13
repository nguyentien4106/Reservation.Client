using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Model.Strings;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.UserServicesRegister;
using Reservation.Server.Serivces.UserServiceRegister;

namespace Reservation.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CollaboratorController(ICollaboratorService collaboratorService) : ControllerBase
    {
        private readonly ICollaboratorService _collaboratorService = collaboratorService;

        [HttpGet]
        public async Task<AppResponse<ApplicationUser>> GetUser(string email)
        {
            return await _collaboratorService.GetUserAsync(email);
        }
    }
}

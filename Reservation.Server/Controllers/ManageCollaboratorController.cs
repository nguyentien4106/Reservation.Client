using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Serivces.ManageCollaborator;

namespace Reservation.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Authorize("ADMIN")]
    public class ManageCollaboratorController(IManageCollaboratorService manageCollaboratorService) : ControllerBase
    {
        private readonly IManageCollaboratorService _manageCollaboratorService = manageCollaboratorService;

        [HttpGet]
        public async Task<AppResponse<List<CollaboratorDTO>>> GetAll()
        {
            return await _manageCollaboratorService.GetAllAsync(0);
        }
    }
}

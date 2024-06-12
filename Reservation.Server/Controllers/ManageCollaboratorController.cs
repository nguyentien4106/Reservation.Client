using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Collaborator;
using Reservation.API.Models.Enum;
using Reservation.API.Serivces.ManageCollaborator;

namespace Reservation.API.Controllers
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
            return await _manageCollaboratorService.GetAllAsync((int)CollaboratorGetType.All);
        }
    }
}

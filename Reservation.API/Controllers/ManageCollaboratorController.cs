using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;
using Reservation.Domain.Models.Enum;
using Reservation.Application.Serivces.ManageCollaborator;

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
            return await _manageCollaboratorService.GetAllAsync((int)CollaboratorStatus.All);
        }
    }
}

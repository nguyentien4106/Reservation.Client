using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Model.Strings;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.DTO.UserServicesRegister;
using Reservation.Server.Models.Request;
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
        public async Task<AppResponse<string>> GetUser(string email)
        {
            return await _collaboratorService.GetUserIdAsync(email);
        }

        [HttpPost]
        public async Task<AppResponse<string>> Add(CollaboratorDTO dto)
        {
            return await _collaboratorService.AddAsync(dto);
        }

        [HttpPost]
        public async Task<AppResponse<string>> Update(CollaboratorDTO dto)
        {
            return await _collaboratorService.UpdateAsync(dto);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<AppResponse<CollaboratorDTO>> GetProfile(Guid? collaboratorId)
        {
            return await _collaboratorService.GetProfileAsync(collaboratorId);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<AppResponse<List<CollaboratorDTO>>> GetAll(int type)
        {
            return await _collaboratorService.GetAllAsync(type);

        }

        [HttpPost]
        public async Task<AppResponse<string>> ChangeStatus(ChangeStatusRequest request)
        {
            return await _collaboratorService.ChangeStatusAsync(request.CollaboratorId, request.Status);
        }
    }
}

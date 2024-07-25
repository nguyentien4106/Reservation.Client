using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Model.Strings;
using Reservation.Infrastructure.Data;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Application.Serivces.UserServiceRegister;
using Reservation.Domain.Models.Request.Auth;
using Reservation.Domain.Models.Request.Collaborators;
using Reservation.Domain.Models.ViewModel;

namespace Reservation.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class CollaboratorsController(ICollaboratorService collaboratorService) : ControllerBase
    {
        private readonly ICollaboratorService _collaboratorService = collaboratorService;

        [HttpPost]
        public async Task<AppResponse<string>> Add(CollaboratorDTO dto)
        {
            return await _collaboratorService.AddAsync(dto);
        }

        [HttpPut]
        public async Task<AppResponse<string>> Update(CollaboratorDTO dto)
        {
            return await _collaboratorService.UpdateAsync(dto);
        }

        [HttpGet("{collaboratorId}")]
        [AllowAnonymous]
        public async Task<AppResponse<CollaboratorDTO>> GetProfile(Guid? collaboratorId)
        {
            return await _collaboratorService.GetProfileAsync(collaboratorId);
        }

        [HttpGet]
        [Route("[action]")]
        [AllowAnonymous]
        public async Task<AppResponse<CollaboratorDTO>> GetProfileByEmail(string? email)
        {
            return await _collaboratorService.GetProfileByEmailAsync(email);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<AppResponse<string>> ChangeStatus(ChangeStatusRequest request)
        {
            return await _collaboratorService.ChangeStatusAsync(request.CollaboratorId, request.Status);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<AppResponse<PagingViewModel<List<CollaboratorDTO>>>> Collaborators([FromQuery] GetCollaboratorsRequest request)
        {
            return await _collaboratorService.GetAllAsync(request);
        }
    }
}

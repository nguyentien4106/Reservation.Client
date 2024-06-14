using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;
using Reservation.Domain.Models.Enum;

namespace Reservation.Application.Serivces.ManageCollaborator
{
    public class ManageCollaboratorService(ApplicationDbContext context, IMapper mapper) : IManageCollaboratorService
    {
        private readonly IMapper _mapper = mapper;
        private readonly ApplicationDbContext _context = context;

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(int type)
        {
            var collaborators = await _context.Collaborators.ToListAsync();
            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators));
        }
    }
}

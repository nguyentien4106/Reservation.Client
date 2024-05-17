using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Data.Entities;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.Enum;

namespace Reservation.Server.Serivces.ManageCollaborator
{
    public class ManageCollaboratorService(ApplicationDbContext context, IMapper mapper) : IManageCollaboratorService
    {
        private readonly IMapper _mapper = mapper;
        private readonly ApplicationDbContext _context = context;

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(int type)
        {
            //Func<Collaborator, bool> prediction = type switch
            //{
            //    (int)CollaboratorGetType.All => (Collaborator item) => true,
            //    (int)CollaboratorGetType.ReadyAndReviewing => (Collaborator item) => item.IsReady == true && item.Status == (int)ProfileStatus.Reviewing,
            //    _ => (Collaborator item) => item.IsReady == false,
            //};

            //var collaborators = _context.Collaborators
            //    .Include(item => item.CollaboratorServices)
            //    .ThenInclude(item => item.Service)
            //    .Where(prediction)
            //    .ToList();

            var collaborators = await _context.Collaborators.ToListAsync();
            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators));
        }
    }
}

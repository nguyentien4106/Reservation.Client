using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.API.Data;
using Reservation.API.Data.Entities;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Collaborator;
using Reservation.API.Models.Enum;

namespace Reservation.API.Serivces.ManageCollaborator
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

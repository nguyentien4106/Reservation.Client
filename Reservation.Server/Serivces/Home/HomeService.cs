using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.Enum;

namespace Reservation.Server.Serivces.Home
{
    public class HomeService(ApplicationDbContext context, IMapper mapper) : IHomeService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync()
        {
            var collaborators = await _context.Collaborators.Where(item => item.Status == (int)ProfileStatus.Verified && item.IsReady == true).ToListAsync();

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators));
        }
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Data.Entities;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.Enum;

namespace Reservation.Server.Serivces.Home
{
    public class HomeService(ApplicationDbContext context, IMapper mapper) : IHomeService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private const string All = "All";
        private const int MaxAge = 50;

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync()
        {
            var collaborators = await _context.Collaborators.Where(item => item.IsReady == true).ToListAsync();

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators));
        }

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(string city, string district, string sex, int maxAge)
        {
            var query = _context.Collaborators.AsQueryable();

            query = query.Where(collaborator => city == All ? true : collaborator.City == city);

            query = query.Where(collaborator => district == All ? true : collaborator.District == district);

            query = query.Where(collaborator => sex == All ? true : collaborator.Sex == sex);


            var result = await query.ToListAsync();

            result = result.Where(item => GetAge(item.BirthDate.GetValueOrDefault()) <= maxAge).ToList();

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(result));
        }

        private static int GetAge(DateTime? birthDate)
        {
            if (!birthDate.HasValue)
            {
                return 0;
            }

            var year = birthDate.Value.Year;

            return DateTime.Today.Year - year;
        }
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.API.Data;
using Reservation.API.Data.Entities;
using Reservation.API.Extensions;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Collaborator;
using Reservation.API.Models.DTO.Email;
using Reservation.API.Models.DTO.Home;
using Reservation.API.Models.Enum;
using Reservation.API.Serivces.Email;

namespace Reservation.API.Serivces.Home
{
    public class HomeService(ApplicationDbContext context, IMapper mapper, IEmailService emailService) : IHomeService
    {
        private readonly IEmailService _emailService = emailService;
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        private const string All = "All";

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync()
        {
            var collaborators = await _context.Collaborators.Include(item=> item.View).Where(item => item.IsReady == true).ToListAsync();

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators).OrderByAvgRate());
        }

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(string city, string district, string sex, int orderType)
        {
            var query = _context.Collaborators.Include(item => item.View).AsQueryable();

            query = query.Where(collaborator => city == All || collaborator.City == city);

            query = query.Where(collaborator => district == All || collaborator.District == district);

            query = query.Where(collaborator => sex == All || collaborator.Sex == sex);

            var result = await query.ToListAsync();

            if(result == null)
            {
                return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse([]);
            }
            var collaboratorDtos = _mapper.Map<List<CollaboratorDTO>>(result);

            switch (orderType)
            {
                case (int)OrderFilterType.PriceIncreasing:
                    collaboratorDtos = collaboratorDtos.OrderByPrice();
                    break;

                case (int)OrderFilterType.PriceDecreasing:
                    collaboratorDtos = collaboratorDtos.OrderByPriceDecreasing();
                    break;

                case (int)OrderFilterType.RateCountIncreasing:
                    collaboratorDtos = collaboratorDtos.OrderByRateCount();
                    break;

                case (int)OrderFilterType.RateCountDecreasing:
                    collaboratorDtos = collaboratorDtos.OrderByRateCountDecreasing();
                    break;

                case (int)OrderFilterType.AgeIncreasing:
                    collaboratorDtos = collaboratorDtos.OrderByAge();
                    break;

                case (int)OrderFilterType.AgeDecreasing:
                    collaboratorDtos = collaboratorDtos.OrderByAgeDecreasing();
                    break;
            }

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(collaboratorDtos);
        }

    }
}

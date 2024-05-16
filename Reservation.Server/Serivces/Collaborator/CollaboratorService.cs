using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Data.Entities;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.Enum;

namespace Reservation.Server.Serivces.UserServiceRegister
{
    public class CollaboratorService(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IMapper mapper) : ICollaboratorService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly IMapper _mapper = mapper;

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync()
        {
            return new AppResponse<List<CollaboratorDTO>>();
        }

        public async Task<AppResponse<CollaboratorDTO>> GetProfileAsync(string id)
        {
            var collaborator = await _context.Collaborators
                .Include(item => item.CollaboratorServices)
                .ThenInclude(cs => cs.Service)
                .FirstOrDefaultAsync(collaborator => collaborator.ApplicationUserId == id);

            if(collaborator == null)
            {
                return new AppResponse<CollaboratorDTO>().SetErrorResponse("id", "User not found!");
            }

            return new AppResponse<CollaboratorDTO>().SetSuccessResponse(_mapper.Map<CollaboratorDTO>(collaborator));
        }

        public async Task<AppResponse<string>> GetUserIdAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new AppResponse<string>().SetErrorResponse("user", "User not found");
            }

            return new AppResponse<string>().SetSuccessResponse(user.Id);
        }

        public async Task<AppResponse<CollaboratorDTO>> RegisterAsync(CollaboratorDTO dto)
        {
            if (string.IsNullOrEmpty(dto.ApplicationUserId))
            {
                return new AppResponse<CollaboratorDTO>().SetErrorResponse("user", "User not found");
            }

            var collaborator = await _context.Collaborators.FirstOrDefaultAsync(item => item.ApplicationUserId == dto.ApplicationUserId);
            
            if (collaborator != null)
            {
                _context.CollaboratorServices.RemoveRange(collaborator.CollaboratorServices);
                Update(collaborator, dto);

                await _context.SaveChangesAsync(); 
                return new AppResponse<CollaboratorDTO>().SetErrorResponse("user", "Already exists in system.");
            }

            //var collaborator = _mapper.Map<Collaborator>(dto);
            //collaborator.Status = (int)ProfileStatus.Reviewing;

            //await _context.Collaborators.AddAsync(collaborator);
            //await _context.SaveChangesAsync();

            return new AppResponse<CollaboratorDTO>().SetSuccessResponse(dto);
        }

        private void Update(Collaborator entity, CollaboratorDTO newValue)
        {
            entity.IsReady = newValue.IsReady;
            entity.NickName = newValue.NickName;
            entity.PhoneNumber = newValue.PhoneNumber;
        }
    }

   
}

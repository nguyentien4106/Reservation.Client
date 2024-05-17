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
            var collaborators = await _context.Collaborators
                .Include(item => item.CollaboratorServices)
                .ThenInclude(item => item.Service)
                .ToListAsync();

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators));
        }

        public async Task<AppResponse<CollaboratorDTO>> GetProfileAsync(Guid? collaboratorId)
        {
            if(collaboratorId == null || !collaboratorId.HasValue)
            {
                return new AppResponse<CollaboratorDTO>().SetSuccessResponse(new (), "id", $"{collaboratorId} not found!");
            }

            var collaborator = await _context.Collaborators
                .Include(item => item.CollaboratorServices)
                .ThenInclude(cs => cs.Service)
                .FirstOrDefaultAsync(collaborator => collaborator.Id == collaboratorId);

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

        public async Task<AppResponse<string>> AddAsync(CollaboratorDTO dto)
        {
            var newCollaborator = _mapper.Map<Collaborator>(dto);
            newCollaborator.Status = (int)ProfileStatus.Reviewing;

            await _context.Collaborators.AddAsync(newCollaborator);
            await _context.SaveChangesAsync();

            return new AppResponse<string>().SetSuccessResponse("Add new Successfully!");
        }

        public async Task<AppResponse<string>> UpdateAsync(CollaboratorDTO dto)
        {
            if (!dto.Id.HasValue)
            {
                return new AppResponse<string>().SetErrorResponse("user", "User not found");
            }

            var collaborator = await _context.Collaborators.Include(item => item.CollaboratorServices).SingleOrDefaultAsync(item => item.Id == dto.Id);

            if (collaborator == null)
            {
                return new AppResponse<string>().SetErrorResponse("user", $"Collaborator is not existed with ${dto.Id}");

            }

            _context.CollaboratorServices.RemoveRange(collaborator.CollaboratorServices);
            var collaboratorServices = _mapper.Map<List<Data.Entities.CollaboratorService>>(dto.CollaboratorServices);
            _context.CollaboratorServices.AddRange(collaboratorServices);

            Update(collaborator, dto);
            await _context.SaveChangesAsync();
            return new AppResponse<string>().SetSuccessResponse("Update Successfully!");
        }

        private void Update(Collaborator entity, CollaboratorDTO newValue)
        {
            entity.IsReady = newValue.IsReady;
            entity.NickName = newValue.NickName;
            entity.PhoneNumber = newValue.PhoneNumber;
            entity.Email = newValue.Email;
            entity.City = newValue.City;
            entity.District = newValue.District;
            entity.BirthDate = newValue.BirthDate;
            entity.PricePerHour = newValue.PricePerHour;
            entity.Introduction = newValue.Introduction;
            entity.Title = newValue.Title;
            entity.Weight = newValue.Weight;
            entity.Height = newValue.Height;
            entity.Job = newValue.Job;
        }
    }

   
}

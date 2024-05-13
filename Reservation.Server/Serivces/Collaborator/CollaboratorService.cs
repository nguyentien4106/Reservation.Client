using Microsoft.AspNetCore.Identity;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;

namespace Reservation.Server.Serivces.UserServiceRegister
{
    public class CollaboratorService : ICollaboratorService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public CollaboratorService(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<AppResponse<ApplicationUser>> GetUserAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new AppResponse<ApplicationUser>().SetErrorResponse("user", "User not found");
            }

            return new AppResponse<ApplicationUser>().SetSuccessResponse(user);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Reservation.Application.Serivces.Auth;
using Reservation.Domain.Models.DTO.Account;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Auth.Response;
using Reservation.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Reservation.Application.Serivces.Account
{
    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthService _authService;
        public AccountService(ApplicationDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        public async Task<AppResponse<ApplicationUser>> GetUser(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new AppResponse<ApplicationUser>().SetCommonError();
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

            return user == null ? new AppResponse<ApplicationUser>().SetCommonError()
                : new AppResponse<ApplicationUser>().SetSuccessResponse(user);
        }

        public Task<AppResponse<ApplicationUser>> GetUserAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<AppResponse<List<ApplicationUser>>> GetUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return new AppResponse<List<ApplicationUser>>().SetSuccessResponse(users);
        }


        public async Task<AppResponse<UserLoginResponse>> UpdateUserAsync(ClaimsPrincipal userPrincipal, string userId, UserDTO dto)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new AppResponse<UserLoginResponse>().SetCommonError();
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

            if(user == null)
                return new AppResponse<UserLoginResponse>().SetCommonError();

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.PhoneNumber = dto.PhoneNumber;

            await _context.SaveChangesAsync();

            await _authService.LogoutAsync(userPrincipal);

            var response = await _authService.GenerateUserToken(user);

            return new AppResponse<UserLoginResponse>().SetSuccessResponse(response);
        }
    }
}

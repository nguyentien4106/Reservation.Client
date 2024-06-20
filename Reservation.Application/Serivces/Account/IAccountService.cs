using Reservation.Domain.Models.DTO.Account;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Auth.Response;
using Reservation.Infrastructure.Data;
using System.Security.Claims;

namespace Reservation.Application.Serivces.Account
{
    public interface IAccountService
    {
        Task<AppResponse<ApplicationUser>> GetUserAsync(string userId);

        Task<AppResponse<List<ApplicationUser>>> GetUsersAsync();

        Task<AppResponse<UserLoginResponse>> UpdateUserAsync(ClaimsPrincipal user, string userId, UserDTO dto);

    }
}

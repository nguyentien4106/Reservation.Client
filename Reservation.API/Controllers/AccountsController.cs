using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.Application.Serivces.Account;
using Reservation.Domain.Models.DTO.Account;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Auth.Response;
using Reservation.Infrastructure.Data;

namespace Reservation.API.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ApiController]
    public class AccountsController(IAccountService accountService) : ControllerBase
    {
        private readonly IAccountService _accountService = accountService;

        [HttpGet("{userId}")]
        public async Task<AppResponse<ApplicationUser>> GetUser(string userId)
        {
            return await _accountService.GetUserAsync(userId);
        }

        [HttpPost("{userId}")]
        public async Task<AppResponse<UserLoginResponse>> UpdateUser(string userId, UserDTO dto)
        {
            return await _accountService.UpdateUserAsync(User, userId, dto);
        }

        [HttpGet]
        public async Task<AppResponse<List<ApplicationUser>>> GetUsers()
        {
            return await _accountService.GetUsersAsync();
        }
    }
}

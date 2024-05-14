using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Auth.Request;
using Reservation.Server.Models.DTO.Auth.Response;
using Reservation.Server.Serivces.Auth;
using System.Security.Claims;

namespace Reservation.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        private readonly IAuthService _authService = authService;

        [HttpPost]
        public async Task<AppResponse<bool>> Register(UserRegisterRequest req)
        {
            var path = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}";
            
            return await _authService.RegisterAsync(req, path);
        }

        [HttpPost]
        public async Task<AppResponse<UserLoginResponse>> Login(UserLoginRequest req)
        {
            return await _authService.LoginAsync(req);
        }

        [HttpPost]
        public async Task<AppResponse<bool>> Logout()
        {
            return await _authService.LogoutAsync(User);
        }

        [HttpGet]
        [Authorize]
        public string Profile()
        {
            return User.FindFirst("UserName")?.Value ?? "";
        }

        [HttpGet]
        public async Task<AppResponse<string>> ConfirmEmail(string email, string code)
        {
            return await _authService.EmailConfirm(email, code);
        }

        [HttpGet]
        public async Task<UserLoginResponse> RegenerateToken(string email)
        {
            return await _authService.RegenerateToken(email);
        }
    }
}

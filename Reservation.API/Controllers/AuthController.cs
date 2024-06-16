using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Reservation.Infrastructure.Data;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Auth.Request;
using Reservation.Domain.Models.DTO.Auth.Response;
using Reservation.Application.Serivces.Auth;
using System.Security.Claims;
using System.Security.Policy;
using Reservation.Domain.Models.Request.Auth;

namespace Reservation.API.Controllers
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

        [HttpPost]
        public async Task<AppResponse<string>> ConfirmEmail(ConfirmEmailRequest request)
        {
            return await _authService.EmailConfirm(request.Email, request.Code);
        }

        [HttpPost]
        public async Task<AppResponse<UserLoginResponse>> RefreshToken(UserLoginResponse req)
        {
            return await _authService.UserRefreshTokenAsync(req);
        }

        [HttpPost]
        public async Task<AppResponse<string>> ForgotPassword(ForgotPasswordRequest request)
        {
            var path = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}";
            
            return await _authService.ForgotPasswordAsync(request, path);
        }

        [HttpPost]
        public async Task<AppResponse<string>> ResetPassword(ResetPasswordRequest request)
        {

            return await _authService.ResetPasswordAsync(request);
        }

        [HttpPost]
        public async Task<AppResponse<IdentityResult>> ChangePassword(ChangePasswordRequest request)
        {
            return await _authService.ChangePasswordAsync(request);
        }
    }
}

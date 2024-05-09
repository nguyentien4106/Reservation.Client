using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
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
            return await _authService.RegisterAsync(req);
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

        [HttpPost]
        [Authorize]
        public string Profile()
        {
            return User.FindFirst("UserName")?.Value ?? "";
        }
    }

    //[HttpPost]
    //[Authorize]
    //public async Task<IActionResult> Login(string email, string password)
    //{
    //    var user = await _userManager.FindByEmailAsync(email);

    //    if(user == null)
    //    {
    //        return NotFound("Email is not registered");
    //    }
    //    var emailConfirmed = await _userManager.IsEmailConfirmedAsync(user);
    //    if (!emailConfirmed)
    //    {
    //        return BadRequest("Email is not confirmed");
    //    }

    //    var result = await _signInManager.CheckPasswordSignInAsync(user, password, true);

    //    if (result.Succeeded)
    //    {
    //        return Ok(result);
    //    }
    //    else
    //    {
    //        return NotFound("Password is not correct");
    //    }
    //}

}

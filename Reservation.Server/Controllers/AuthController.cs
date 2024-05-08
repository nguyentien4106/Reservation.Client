using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Reservation.Server.Data;
using System.Security.Claims;

namespace Reservation.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDbContext applicationDbContext
            ) : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
        private readonly ApplicationDbContext _context = applicationDbContext;

        

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Logout(SignInManager<ApplicationUser> signInManager)
        {
            await signInManager.SignOutAsync();
            return Ok();
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Login(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if(user == null)
            {
                return NotFound("Email is not registered");
            }
            var emailConfirmed = await _userManager.IsEmailConfirmedAsync(user);
            if (!emailConfirmed)
            {
                return BadRequest("Email is not confirmed");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, true);

            if (result.Succeeded)
            {
                return Ok(result);
            }
            else
            {
                return NotFound("Password is not correct");
            }
        }
    }
}

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data.Entities;
using System.Security.Claims;

namespace Reservation.Server.Data
{
    public class ApplicationDbContextInitializer(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        private readonly ApplicationDbContext _context = context;
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;

        public async Task InitialiseAsync()
        {
            try
            {
                if (_context.Database.IsSqlServer())
                {
                    await _context.Database.MigrateAsync();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
                await TrySeedServices();

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private async Task TrySeedServices()
        {
            var services = new List<Service>()
            {
                new(){ Name = "Đi cafe"},
                new(){ Name = "Đi nhậu"},
                new(){ Name = "Đi ăn"},
                new(){ Name = "Tâm sự"},
                new(){ Name = "Ra mắt gia đình"},
                new(){ Name = "Dự tiệc"},
                new(){ Name = "Chơi game"},
                new(){ Name = "Billard"},
                new(){ Name = "Du lịch"},
                new(){ Name = "Xem phim"},
                new(){ Name = "Hát karaoke"},
                new(){ Name = "Chơi bida"},
                new(){ Name = "Chơi Bowling"},
            };

            foreach(var service in services)
            {
                if(_context.Services.All(item => item.Name != service.Name))
                {
                    await _context.Services.AddAsync(service);
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task TrySeedAsync()
        {
            // Default roles
            var administratorRole = new IdentityRole("ADMIN");

            if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
            {
                await _roleManager.CreateAsync(administratorRole);
            }

            var userRole = new IdentityRole("USER");

            if (_roleManager.Roles.All(r => r.Name != userRole.Name))
            {
                await _roleManager.CreateAsync(userRole);
            }

            // Default users
            var administrator = new ApplicationUser { UserName = "admin@gmail.com", Email = "admin@gmail.com" };

            if (_userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await _userManager.CreateAsync(administrator, "Ti100600@");
                if (!string.IsNullOrWhiteSpace(administratorRole.Name))
                {
                    await _userManager.AddToRolesAsync(administrator, new[] { administratorRole.Name });
                }
            }

            // Default users
            var user = new ApplicationUser { UserName = "user@gmail.com", Email = "user@gmail.com" };

            if (_userManager.Users.All(u => u.UserName != user.UserName))
            {
                await _userManager.CreateAsync(user, "Ti100600@");
                if (!string.IsNullOrWhiteSpace(userRole.Name))
                {
                    await _userManager.AddToRolesAsync(user, new[] { userRole.Name });
                }
            }
        }
    }
}

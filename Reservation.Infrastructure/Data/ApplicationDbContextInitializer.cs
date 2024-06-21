using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data.Entities;

namespace Reservation.Infrastructure.Data
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

        public async Task SeedDevAsync()
        {
            try
            {
                await TrySeedUsersAsync();
                await TrySeedCollaboratorAsync();

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
            var administrator = new ApplicationUser { UserName = "admin@gmail.com", Email = "admin@gmail.com", EmailConfirmed = true };

            if (_userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await _userManager.CreateAsync(administrator, "Ti100600@");
                if (!string.IsNullOrWhiteSpace(administratorRole.Name))
                {
                    await _userManager.AddToRolesAsync(administrator, new[] { administratorRole.Name });
                }
            }

            // Default users
            var user = new ApplicationUser { UserName = "user@gmail.com", Email = "user@gmail.com", EmailConfirmed = true};

            if (_userManager.Users.All(u => u.UserName != user.UserName))
            {
                await _userManager.CreateAsync(user, "Ti100600@");
                if (!string.IsNullOrWhiteSpace(userRole.Name))
                {
                    await _userManager.AddToRolesAsync(user, new[] { userRole.Name });
                }
            }
        }

        public async Task TrySeedUsersAsync()
        {
            var userRole = new IdentityRole("USER");

            if (_roleManager.Roles.All(r => r.Name != userRole.Name))
            {
                await _roleManager.CreateAsync(userRole);
            }

            // Default users

            for(var i = 1; i <= 100; i++)
            {

                var user = new ApplicationUser { UserName = $"user_test_{i}@gmail.com", Email = $"user_test_{i}@gmail.com", EmailConfirmed = true };

                if (_userManager.Users.All(u => u.UserName != user.UserName))
                {
                    var result = await _userManager.CreateAsync(user, "Ti100600@");
                    if (!string.IsNullOrWhiteSpace(userRole.Name))
                    {
                        await _userManager.AddToRolesAsync(user, new[] { userRole.Name });
                    }

                    if (result.Succeeded && user.Collaborator == null)
                    {
                        var collaborator = new Collaborator
                        {
                            ApplicationUser = user,
                            NickName = $"Nick Name User Test {i}",
                            IsReady = i % 2 == 0,
                            PhoneNumber = $"035981166{i}",
                            Email = $"user_test_{i}@gmail.com",
                            City = i % 2 == 0 ? "Thành phố Hồ Chí Minh" : "Thành phố Hà Nội",
                            District = i % 2 == 0 ? "Quận 1" : "Quận Hai Bà Trưng",
                            BirthDate = DateTime.Now.AddMonths(-i),
                            Introduction = $"{i}  Xin chàooo\r\n\r\n🌸 Mình là Sâu giọng miền Bắc\r\n\r\n🌸 Mình khá là ngoan , máy nhà míc k ồn và ít khi toxic.\r\n\r\n🌸 Chơi game có 3 mode là :\r\n\r\n- 𝐃𝐞̂̃ 𝐭𝐡𝐮̛𝐨̛𝐧𝐠 , 𝐓𝐚̂́𝐮 𝐡𝐚̀𝐢 và 𝐂𝐨𝐨𝐥 𝐧𝐠𝐚̂̀𝐮 . Đôi lúc có chút khùng >.<\r\n\r\n--------------------------------------\r\n\r\n🌸 𝐏𝐔𝐁𝐆 𝐏𝐂 :- 4000h Tay k to nhưng có thể tự lo :3\r\n\r\n🌸 𝐋𝐎𝐋 :- Rank, Aram, Flex, Custom ...... ( NA, OCE, KR, JP )\r\n\r\n🌸 𝐓𝐅𝐓 :- rank lục bảo , k tranh bài với user :)))\r\n\r\n🌸 Nhận cả LOL sv PBE để tham khảo mùa mới với user ạ\r\n\r\n🌸 𝐍𝐀𝐑𝐀𝐊𝐀\r\n\r\n🌸 𝐀𝐦𝐨𝐧𝐠𝐮𝐬\r\n\r\n🌸 𝐀𝐠𝐫𝐨𝐮\r\n\r\n🌸 𝐁𝐮𝐬𝐢𝐧𝐞𝐬𝐬 𝐓𝐨𝐮𝐫\r\n\r\n🌸 𝐆𝐨𝐨𝐬𝐞 𝐠𝐨𝐨𝐬𝐞 𝐝𝐮𝐜𝐤\r\n\r\n----------------------------------\r\n\r\n❌ Mình không nhận chơi nợ\r\n\r\n❌ Không chơi game trước trả tiền sau .",
                            Height = 170,
                            Weight = 70,
                            Job = $"Sinh viên {i}",
                            Title = $"You will never forget me",
                            CollaboratorServices =
                            [
                                new CollaboratorService
                                {
                                    ServiceId = new Guid("8364ba10-3662-49de-b639-08dc7d01eef9"),
                                    Price = 500000
                                },
                                new CollaboratorService
                                {
                                    ServiceId = new Guid("d6cfe2b4-3f90-4d13-b63a-08dc7d01eef9"),
                                    Price = 500000
                                },
                                new CollaboratorService
                                {
                                    ServiceId = new Guid("127bb02a-9d7f-438b-b63b-08dc7d01eef9"),
                                    Price = 500000
                                },
                                new CollaboratorService
                                {
                                    ServiceId = new Guid("da5beb1a-0399-43c9-b63c-08dc7d01eef9"),
                                    Price = 500000
                                },
                                new CollaboratorService
                                {
                                    ServiceId = new Guid("85a4bc93-dd15-4705-b63d-08dc7d01eef9"),
                                    Price = 500000
                                },
                                new CollaboratorService
                                {
                                    ServiceId = new Guid("783c4473-f5b4-4520-b63e-08dc7d01eef9"),
                                    Price = 500000
                                }
                            ],
                            Status = 0,
                            Sex = "Female",
                            OtherServices = "Nothings"
                        };
                    }
                }


            }


        }

        public async Task TrySeedCollaboratorAsync()
        {
            var collborators = new List<Collaborator>();
            for (var i = 1; i <= 100; i++)
            {
                var user = await _userManager.FindByEmailAsync($"user_test_{i}@gmail.com");
                if (user == null)
                {
                    return;
                }
                var profile = await _context.Collaborators.SingleOrDefaultAsync(u => u.ApplicationUserId == user.Id);

                if(profile == null)
                {
                    var services = _context.Services.ToList();
                    var collaboratorServices = services.Select(item => new CollaboratorService()
                    {
                        Service = item,
                        Price = 500000
                    }).ToList();
                    var collaborator = new Collaborator
                    {
                        ApplicationUser = user,
                        NickName = $"Nick Name User Test {i}",
                        IsReady = i % 2 == 0,
                        PhoneNumber = $"035981166{i}",
                        Email = $"user_test_{i}@gmail.com",
                        City = i % 2 == 0 ? "Thành phố Hồ Chí Minh" : "Thành phố Hà Nội",
                        District = i % 2 == 0 ? "Quận 1" : "Quận Hai Bà Trưng",
                        BirthDate = DateTime.Now.AddMonths(-i),
                        Introduction = $"{i}  Xin chàooo\r\n\r\n🌸 Mình là Sâu giọng miền Bắc\r\n\r\n🌸 Mình khá là ngoan , máy nhà míc k ồn và ít khi toxic.\r\n\r\n🌸 Chơi game có 3 mode là :\r\n\r\n- 𝐃𝐞̂̃ 𝐭𝐡𝐮̛𝐨̛𝐧𝐠 , 𝐓𝐚̂́𝐮 𝐡𝐚̀𝐢 và 𝐂𝐨𝐨𝐥 𝐧𝐠𝐚̂̀𝐮 . Đôi lúc có chút khùng >.<\r\n\r\n--------------------------------------\r\n\r\n🌸 𝐏𝐔𝐁𝐆 𝐏𝐂 :- 4000h Tay k to nhưng có thể tự lo :3\r\n\r\n🌸 𝐋𝐎𝐋 :- Rank, Aram, Flex, Custom ...... ( NA, OCE, KR, JP )\r\n\r\n🌸 𝐓𝐅𝐓 :- rank lục bảo , k tranh bài với user :)))\r\n\r\n🌸 Nhận cả LOL sv PBE để tham khảo mùa mới với user ạ\r\n\r\n🌸 𝐍𝐀𝐑𝐀𝐊𝐀\r\n\r\n🌸 𝐀𝐦𝐨𝐧𝐠𝐮𝐬\r\n\r\n🌸 𝐀𝐠𝐫𝐨𝐮\r\n\r\n🌸 𝐁𝐮𝐬𝐢𝐧𝐞𝐬𝐬 𝐓𝐨𝐮𝐫\r\n\r\n🌸 𝐆𝐨𝐨𝐬𝐞 𝐠𝐨𝐨𝐬𝐞 𝐝𝐮𝐜𝐤\r\n\r\n----------------------------------\r\n\r\n❌ Mình không nhận chơi nợ\r\n\r\n❌ Không chơi game trước trả tiền sau .",
                        Height = 170,
                        Weight = 70,
                        Job = $"Sinh viên {i}",
                        Title = $"You will never forget me",
                        
                        CollaboratorServices = collaboratorServices,
                        Status = 0,
                        Sex = "Female",
                        OtherServices = "Nothings"
                    };

                    collborators.Add(collaborator);
                }
                
            }

            
            await _context.Collaborators.AddRangeAsync(collborators);

            await _context.SaveChangesAsync();

        }
    }
}

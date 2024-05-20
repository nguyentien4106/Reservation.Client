
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Reservation.Server.Profile;
using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Serivces.Auth;
using Reservation.Server.Serivces.Email;
using System.Security.Claims;
using System.Text;
using Reservation.Server.Serivces.UserServiceRegister;
using Reservation.Server.Serivces.Service;
using Reservation.Server.Serivces.Home;
using Microsoft.OpenApi.Models;
using Reservation.Server.Middleware;
using Reservation.Server.Serivces.ManageCollaborator;

namespace Reservation.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");
            var appSettings = builder.Configuration.GetSection("TokenSettings").Get<TokenSettings>() ?? default!;
            builder.Services.AddSingleton(appSettings);
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<ApplicationUser>(opts =>
            {
                opts.SignIn.RequireConfirmedEmail = false;
                opts.User.RequireUniqueEmail = true;
            })
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>("REFRESHTOKENPROVIDER");
            ;

            builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
            {
                options.TokenLifespan = TimeSpan.FromSeconds(appSettings.RefreshTokenExpireSeconds);
            });

            // Add services to the container.
            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<IEmailService, EmailService>();
            builder.Services.AddTransient<ICollaboratorService, CollaboratorService>();
            builder.Services.AddTransient<IService, ServiceImpl>();
            builder.Services.AddTransient<IHomeService, HomeService>();
            builder.Services.AddTransient<IManageCollaboratorService, ManageCollaboratorService>();

            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

            builder.Services.AddControllers();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = appSettings.Audience,
                    ValidIssuer = appSettings.Issuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.SecretKey))
                };
            });


            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("webAppRequests", builder =>
                {
                    builder.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins(appSettings.Audience)
                    .AllowCredentials();
                });
            });

            builder.Services.AddSwaggerGen(opt =>
            {
                opt.CustomSchemaIds(type => type.FullName);
                opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
                opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });

                opt.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
            });

            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

            var app = builder.Build();

            app.UseMiddleware<GlobalExceptionMiddleware>();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.MapIdentityApi<ApplicationUser>();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("webAppRequests");

            app.UseAuthorization();

            app.MapGet("/pingauth", (ClaimsPrincipal user) =>
            {
                var email = user.FindFirstValue(ClaimTypes.Email); // get the user's email from the claim
                return Results.Json(new { Email = email }); ; // return the email as a plain text response
            }).RequireAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}

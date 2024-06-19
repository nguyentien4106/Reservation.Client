using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Reservation.Domain.Profile;
using Reservation.Infrastructure.Data;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Application.Serivces.Auth;
using Reservation.Application.Serivces.Email;
using System.Text;
using Reservation.Application.Serivces.UserServiceRegister;
using Reservation.Application.Serivces.Service;
using Reservation.Application.Serivces.Home;
using Microsoft.OpenApi.Models;
using Reservation.Application.Serivces.ManageCollaborator;
using Reservation.Application.Serivces.Customer;
using Reservation.Application.Serivces.Jobs;
using Reservation.Application.Serivces.Order;
using Reservation.API.Middleware;
using Reservation.Applicattion.Serivces.Email;

namespace Reservation.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("ApplicationDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");
            var appSettings = builder.Configuration.GetSection("TokenSettings").Get<TokenSettings>() ?? default!;

            builder.Services.AddSingleton(appSettings);
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));
            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<ApplicationUser>(opts =>
                            {
                                opts.SignIn.RequireConfirmedEmail = true;
                                opts.User.RequireUniqueEmail = true;
                            })
                            .AddRoles<IdentityRole>()
                            .AddEntityFrameworkStores<ApplicationDbContext>()
                            .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>("REFRESHTOKENPROVIDER");
            builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
            {
                options.TokenLifespan = TimeSpan.FromSeconds(appSettings.RefreshTokenExpireSeconds);
            });

            // Add services to the container.
            builder.Services.AddScoped<ApplicationDbContextInitializer>();
            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<IEmailService, EmailService>();
            builder.Services.AddTransient<ICollaboratorService, CollaboratorService>();
            builder.Services.AddTransient<IService, ServiceImpl>();
            builder.Services.AddTransient<IHomeService, HomeService>();
            builder.Services.AddTransient<IManageCollaboratorService, ManageCollaboratorService>();
            builder.Services.AddTransient<ICustomerService, CustomerService>();
            builder.Services.AddTransient<IJobsService, JobsService>();
            builder.Services.AddTransient<IOrderService, OrderService>();

            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
            builder.Services.AddControllers().AddNewtonsoftJson(
                options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

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
                    builder.WithOrigins(appSettings.Audience)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                });
            });
            builder.Services.AddSwaggerGen(opt =>
            {
                opt.CustomSchemaIds(type => type.FullName);
                opt.SwaggerDoc("v1", new OpenApiInfo { Title = "BookingPlatformAPI", Version = "v1" });
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
            builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);

            var app = builder.Build();

            app.UseMiddleware<GlobalExceptionMiddleware>();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.MapIdentityApi<ApplicationUser>();

            // Configure the HTTP request pipeline.
            using var scope = app.Services.CreateScope();
            var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitializer>();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                await initialiser.InitialiseAsync();
                await initialiser.SeedDevAsync();
            }
            else
            {
                await initialiser.SeedAsync();
            }


            app.UseHttpsRedirection();
            app.UseCors("webAppRequests");
            app.UseAuthorization();
            app.MapControllers();
            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}

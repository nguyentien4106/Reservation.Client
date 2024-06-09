using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Data.Entities;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Customer;
using Reservation.Server.Serivces.Email;

namespace Reservation.Server.Serivces.Jobs
{
    public class JobsService(ApplicationDbContext context, IMapper mapper, IEmailService emailService) : IJobsService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;

        public async Task<AppResponse<bool>> CreateJobAsync(JobDTO jobDTO)
        {
            if (string.IsNullOrEmpty(jobDTO.ApplicationUserId))
            {
                return new AppResponse<bool>().SetErrorResponse("user", "User không tìm thấy thử lại");
            }

            var job = _mapper.Map<Job>(jobDTO);
            await _context.Jobs.AddAsync(job);
            await _context.SaveChangesAsync();

            return new AppResponse<bool>().SetSuccessResponse(true);
        }

        public async Task<AppResponse<List<JobDTO>>> GetAll()
        {
            var jobs = await _context.Jobs.ToListAsync();

            var result = _mapper.Map<List<JobDTO>>(jobs);

            return new AppResponse<List<JobDTO>>().SetSuccessResponse(result);
        }
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.API.Data;
using Reservation.API.Data.Entities;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Jobs;
using Reservation.API.Serivces.Email;

namespace Reservation.API.Serivces.Jobs
{
    public class JobsService(ApplicationDbContext context, IMapper mapper, IEmailService emailService) : IJobsService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;

        public Task<AppResponse<bool>> ApplyJobAsync()
        {
            throw new NotImplementedException();
        }

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
            var jobs = await _context.Jobs.Include(item => item.JobServices).ThenInclude(item => item.Service).ToListAsync();
            var result = _mapper.Map<List<JobDTO>>(jobs);

            return new AppResponse<List<JobDTO>>().SetSuccessResponse(result);
        }
    }
}

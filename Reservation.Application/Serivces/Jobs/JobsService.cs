using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Extensions;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Common;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Domain.Models.ViewModel.Jobs;
using Reservation.Applicattion.Serivces.Email;

namespace Reservation.Application.Serivces.Jobs
{
    public class JobsService(ApplicationDbContext context, IMapper mapper, IEmailService emailService) : IJobsService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;

        public async Task<AppResponse<bool>> ApplyJobAsync(ContractDTO dto)
        {
            if (string.IsNullOrEmpty(dto.LesseeId) || string.IsNullOrEmpty(dto.LessorId))
            {
                return new AppResponse<bool>().SetCommonError();
            }

            var contract = _mapper.Map<Contract>(dto);

            await _context.Contracts.AddAsync(contract);
            await _context.SaveChangesAsync();

            return new AppResponse<bool>().SetSuccessResponse(true);
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

        public async Task<AppResponse<JobsViewModel>> GetAll(PaginationModel paging)
        {
            var count = await _context.Jobs.CountAsync();
            var jobs = await _context.Jobs
                .Include(item => item.ApplicationUser)
                .Include(item => item.JobServices)
                .ThenInclude(item => item.Service)
                .AsNoTracking()
                .OrderByDescending(item => item.CreatedDate)
                .Select(entity => _mapper.Map<JobDTO>(entity))
                .Paginate(paging)
                .ToListAsync();

            var model = new JobsViewModel()
            {
                Jobs = jobs,
                Total = count
            };
            return new AppResponse<JobsViewModel>().SetSuccessResponse(model);
        }
    }
}

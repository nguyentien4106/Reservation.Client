using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Extensions;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Domain.Models.ViewModel.Jobs;
using Reservation.Applicattion.Serivces.Email;
using Reservation.Domain.Models.Request;
using System.Net.NetworkInformation;
using Reservation.Domain.Models.ViewModel;

namespace Reservation.Application.Serivces.Jobs
{
    public class JobsService(ApplicationDbContext context, IMapper mapper, IEmailService emailService) : IJobsService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;

        public async Task<AppResponse<bool>> ApplyJobAsync(ContractDTO dto)
        {
            if (string.IsNullOrEmpty(dto.ApplicationUserId))
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

        public async Task<AppResponse<PagingViewModel<List<JobDTO>>>> GetAll(PagingRequest paging)
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

            var model = new PagingViewModel<List<JobDTO>>(count, jobs);
            return new AppResponse<PagingViewModel<List<JobDTO>>>().SetSuccessResponse(model);
        }

        public async Task<AppResponse<PagingViewModel<List<ContractDTO>>>> GetByUserApplies(PagingRequest paging, string userId)
        {
            var count = await _context.Jobs.CountAsync();
            var contracts = await _context.Contracts
                .Where(item => item.ApplicationUserId == userId)
                .Include(item => item.Job)
                .AsNoTracking()
                .OrderByDescending(item => item.CreatedDate)
                .Paginate(paging)
                .ToListAsync();

            var data = _mapper.Map<List<ContractDTO>>(contracts);

            var model = new PagingViewModel<List<ContractDTO>>(count, data);

            return new AppResponse<PagingViewModel<List<ContractDTO>>>().SetSuccessResponse(model);
        }

        public async Task<AppResponse<PagingViewModel<List<JobDTO>>>> GetByUsers(PagingRequest paging, string userId)
        {
            var query = _context.Jobs.Where(item => item.ApplicationUserId == userId);

            var count = await query.CountAsync();
            var jobs = await query
                .Include(item => item.Contracts)
                .AsNoTracking()
                .OrderByDescending(item => item.CreatedDate)
                .Select(entity => _mapper.Map<JobDTO>(entity))
                .Paginate(paging)
                .ToListAsync();

            var model = new PagingViewModel<List<JobDTO>>(count, jobs);

            return new AppResponse<PagingViewModel<List<JobDTO>>>().SetSuccessResponse(model);
        }
    }
}

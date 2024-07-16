using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Application.Serivces.Email;
using Reservation.Domain.Models.Request;
using Reservation.Domain.Models.ViewModel;
using Reservation.Application.Serivces.IRepositories;
using System.Linq.Expressions;
using Reservation.Domain.Models.Enum;

namespace Reservation.Application.Serivces.Jobs
{
    public class JobsService(
        IUnitOfWork unitOfWork, 
        IMapper mapper, 
        IEmailService emailService
    ) 
        : IJobsService
    {
        //private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<AppResponse<bool>> ApplyJobAsync(ContractDTO dto)
        {
            if (string.IsNullOrEmpty(dto.ApplicationUserId))
            {
                return new AppResponse<bool>().SetCommonError();
            }

            var contract = _mapper.Map<Contract>(dto);
            await _unitOfWork.Contracts.AddAsync(contract);
            await _unitOfWork.CommitAsync();


            return new AppResponse<bool>().SetSuccessResponse(true);
        }

        public async Task<AppResponse<bool>> CreateJobAsync(JobDTO jobDTO)
        {
            if (string.IsNullOrEmpty(jobDTO.ApplicationUserId))
            {
                return new AppResponse<bool>().SetErrorResponse("user", "User không tìm thấy thử lại");
            }

            var job = _mapper.Map<Job>(jobDTO);
            await _unitOfWork.Jobs.AddAsync(job);
            await _unitOfWork.CommitAsync();

            return new AppResponse<bool>().SetSuccessResponse(true);
        }

        public async Task<AppResponse<PagingViewModel<List<JobDTO>>>> GetAll(PagingRequest paging)
        {
            var result = await _unitOfWork.Jobs.GetAllAsync(
                paging: paging,
                include: o => o.Include(i => i.ApplicationUser)
                                .Include(i => i.JobServices)
                                .ThenInclude(i => i.Service),
                orderBy: item => item.OrderByDescending(i => i.CreatedDate)
            );

            var jobs = _mapper.Map<List<JobDTO>>(result.Data);

            var model = new PagingViewModel<List<JobDTO>>(result.Total, jobs);
            return new AppResponse<PagingViewModel<List<JobDTO>>>().SetSuccessResponse(model);
        }

        public async Task<AppResponse<PagingViewModel<List<ContractDTO>>>> GetByUserApplies(PagingRequest paging, string userId)
        {
            Expression<Func<Contract, bool>> filterByUser = c => c.ApplicationUserId == userId;
            var result = await _unitOfWork.Contracts.GetAllAsync(
                    paging: paging,
                    filters: [filterByUser],
                    include: o => o.Include(i => i.Job),
                    orderBy: o => o.OrderByDescending(i => i.CreatedDate)
                );

            var contracts = _mapper.Map<List<ContractDTO>>(result.Data);

            var model = new PagingViewModel<List<ContractDTO>>(result.Total, contracts);

            return new AppResponse<PagingViewModel<List<ContractDTO>>>().SetSuccessResponse(model);
        }

        public async Task<AppResponse<PagingViewModel<List<JobDTO>>>> GetByUsers(PagingRequest paging, string userId)
        {
            Expression<Func<Job, bool>> filterByUser = j => j.ApplicationUserId == userId;

            var result = await _unitOfWork.Jobs.GetAllAsync(
                paging,
                filters: [filterByUser],
                orderBy: o => o.OrderByDescending(item => item.CreatedDate)
            );
            var jobs = _mapper.Map<List<JobDTO>>(result.Data);
            var model = new PagingViewModel<List<JobDTO>>(result.Total, jobs);

            return new AppResponse<PagingViewModel<List<JobDTO>>>().SetSuccessResponse(model);
        }

        public async Task<AppResponse<List<ContractDTO>>> GetContractsByJobId(Guid? jobId)
        {
            if(jobId == null || !jobId.HasValue)
            {
                return new AppResponse<List<ContractDTO>>().SetCommonError();
            }
            Expression<Func<Contract, bool>> filterByJob = c => c.JobId == jobId;
            var contracts = await _unitOfWork.Contracts.GetAllAsync(
                    filters: [filterByJob],
                    include: o => o.Include(i => i.ApplicationUser)
                                    .ThenInclude(i => i.Collaborator)
                );


            return new AppResponse<List<ContractDTO>>().SetSuccessResponse(_mapper.Map<List<ContractDTO>>(contracts));
        }

        public async Task<AppResponse<JobDTO>> GetJob(Guid? jobId)
        {
            if(jobId == null)
            {
                return new AppResponse<JobDTO>().SetCommonError();
            }

            Expression<Func<Job, bool>> filterByJob = j => j.Id == jobId;

            var job = await _unitOfWork.Jobs
                .SingleOrDefaultAsync(
                filterByJob, 
                include: o => o.Include(i => i.ApplicationUser)
                                .Include(i => i.JobServices)
                                .ThenInclude(i => i.Service)
            );
        
            return new AppResponse<JobDTO>().SetSuccessResponse(_mapper.Map<JobDTO>(job));
        }
    }
}

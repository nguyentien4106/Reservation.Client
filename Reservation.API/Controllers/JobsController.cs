using Microsoft.AspNetCore.Mvc;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Domain.Models.ViewModel.Jobs;
using Reservation.Application.Serivces.Jobs;
using Reservation.Domain.Models.Request;
using Reservation.Domain.Models.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace Reservation.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class JobsController(IJobsService service) : Controller
    {

        private readonly IJobsService _service = service;

        [HttpGet]
        [AllowAnonymous]
        public async Task<AppResponse<PagingViewModel<List<JobDTO>>>> GetAll([FromQuery] PagingRequest paging)
        {
            return await _service.GetAll(paging);
        }

        [HttpGet("{jobId}")]
        [AllowAnonymous]
        public async Task<AppResponse<JobDTO>> Job(Guid? jobId)
        {
            return await _service.GetJob(jobId);
        }


        [HttpGet("[action]/{applicationUserId}")]
        public async Task<AppResponse<PagingViewModel<List<JobDTO>>>> Users(string applicationUserId, [FromQuery] PagingRequest paging)
        {
            return await _service.GetByUsers(paging, applicationUserId);
        }

        [HttpGet("[action]/{applicationUserId}")]
        public async Task<AppResponse<PagingViewModel<List<ContractDTO>>>> UserApplied(string applicationUserId, [FromQuery] PagingRequest paging)
        {
            return await _service.GetByUserApplies(paging, applicationUserId);
        }

        [HttpPost]
        public async Task<AppResponse<bool>> CreateJob(JobDTO job)
        {
            return await _service.CreateJobAsync(job);
        }

        [HttpPost("[action]")]
        public async Task<AppResponse<bool>> Apply(ContractDTO contract)
        {
            return await _service.ApplyJobAsync(contract);
        }

        [HttpGet("{jobId}/Contracts")]
        public async Task<AppResponse<List<ContractDTO>>> Contracts(Guid? jobId)
        {
            return await _service.GetContractsByJobId(jobId);
        }

    }
}

using Microsoft.AspNetCore.Mvc;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Common;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Domain.Models.ViewModel.Jobs;
using Reservation.Application.Serivces.Jobs;

namespace Reservation.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
    public class JobsController(IJobsService service) : Controller
    {

        private readonly IJobsService _service = service;

        [HttpGet]
        public async Task<AppResponse<JobsViewModel>> GetAll([FromQuery]PaginationModel paging)
        {
            return await _service.GetAll(paging);
        }

        [HttpPost]
        public async Task<AppResponse<bool>> CreateJob(JobDTO job)
        {
            return await _service.CreateJobAsync(job);
        }

        [HttpPost("[action]/{jobId}")]
        public async Task<AppResponse<bool>> Apply(Guid jobId)
        {
            return await _service.ApplyJobAsync();
        }
    }
}

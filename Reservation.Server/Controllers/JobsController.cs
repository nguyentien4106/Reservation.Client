using Microsoft.AspNetCore.Mvc;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Jobs;
using Reservation.Server.Serivces.Jobs;

namespace Reservation.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    //[Authorize]
    public class JobsController(IJobsService service) : Controller
    {

        private readonly IJobsService _service = service;

        [HttpGet]
        public async Task<AppResponse<List<JobDTO>>> GetAll()
        {
            return await _service.GetAll();
        }

        [HttpPost]
        public async Task<AppResponse<bool>> CreateJob(JobDTO job)
        {
            return await _service.CreateJobAsync(job);
        }
    }
}

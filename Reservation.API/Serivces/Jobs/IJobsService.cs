using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Jobs;

namespace Reservation.API.Serivces.Jobs
{
    public interface IJobsService
    {
        Task<AppResponse<bool>> CreateJobAsync(JobDTO job);

        Task<AppResponse<List<JobDTO>>> GetAll();

        Task<AppResponse<bool>> ApplyJobAsync();
    }
}

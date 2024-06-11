using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Jobs;

namespace Reservation.Server.Serivces.Jobs
{
    public interface IJobsService
    {
        Task<AppResponse<bool>> CreateJobAsync(JobDTO job);

        Task<AppResponse<List<JobDTO>>> GetAll();

        Task<AppResponse<bool>> ApplyJobAsync();
    }
}

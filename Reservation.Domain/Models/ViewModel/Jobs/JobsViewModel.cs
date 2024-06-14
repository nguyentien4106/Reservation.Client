using Reservation.Domain.Models.DTO.Jobs;

namespace Reservation.Domain.Models.ViewModel.Jobs
{
    public class JobsViewModel
    {
        public List<JobDTO> Jobs { get; set; }

        public int Total { get; set; }
    }
}

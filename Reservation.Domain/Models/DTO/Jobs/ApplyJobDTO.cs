namespace Reservation.Domain.Models.DTO.Jobs
{
    public class ApplyJobDTO
    {
        public Guid Id { get; set; }

        public Guid JobId { get; set; }

        public string HostJobUserId { get; set; }

        public string CandidateUserId { get; set; }

    }
}

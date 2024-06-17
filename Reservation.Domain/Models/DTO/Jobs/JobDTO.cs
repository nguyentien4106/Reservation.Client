using Reservation.Domain.Models.DTO.Jobs;

namespace Reservation.Domain.Models.DTO.Jobs
{
    public class JobDTO
    {
        public Guid Id { get; set; }

        public string ApplicationUserId { get; set; }

        public required string Title { get; set; }

        public string? Description { get; set; }

        public string? Required { get; set; }

        public decimal Cast { get; set; }

        public required string Location { get; set; }

        public required DateTime DateTime { get; set; }

        public List<JobServiceDTO> JobServices { get; set; } = [];

        public int? PaymentType { get; set; }

        public int? Status { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string? UserName { get; set; }

        public List<ContractDTO> Contracts { get; set; } = [];

    }
}

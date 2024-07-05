using Reservation.Infrastructure.Data;

namespace Reservation.Domain.Models.DTO.Jobs
{
    public class ContractDTO
    {
        public Guid Id { get; set; }

        public Guid JobId { get; set; }

        public string ApplicationUserId { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? Contact { get; set; }

        public int Status { get; set; }

        public DateTime? CreateAt { get; set; } = DateTime.Now;

        public JobDTO? Job { get; set; }

        public ApplicationUser? ApplicationUser { get; set; }
    }
}

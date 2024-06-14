using System.ComponentModel.DataAnnotations;

namespace Reservation.Infrastructure.Data.Entities
{
    public class Job
    {
        public Guid Id { get; set; }

        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        [Required]
        public required string Title { get; set; }

        public string? Description { get; set; }

        public string? Required { get; set; }

        [Required]
        public decimal Cast { get; set; }

        [Required]
        public required string Location { get; set; }

        [Required]
        public required DateTime DateTime { get; set; }

        public List<JobService> JobServices { get; set; } = [];

        public int? Status { get; set; }

        public int? PaymentType { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public List<Contract> Contracts { get; set; } = [];
    }
}

using System.ComponentModel.DataAnnotations;

namespace Reservation.Infrastructure.Data.Entities
{
    public class Contract
    {
        public Guid Id { get; set; }

        public Guid JobId { get; set; }

        public Job Job { get; set; }

        [Required]
        public required string ApplicationUserId { get; set; }

        public ApplicationUser? ApplicationUser { get; set; }

        public string? Description { get; set; }

        public string? Contact { get; set; }

        public int Status { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.Now;
    }
}

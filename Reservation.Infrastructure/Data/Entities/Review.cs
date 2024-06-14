using System.ComponentModel.DataAnnotations;

namespace Reservation.Infrastructure.Data.Entities
{
    public class Review
    {
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }

        public Order Order { get; set; } = null!;

        public int Rate { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public DateTime? CreatedDate { get; set; }

        public bool Recommend { get; set; }

    }
}

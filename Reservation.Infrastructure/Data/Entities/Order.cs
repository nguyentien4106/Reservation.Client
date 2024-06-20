using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Reservation.Infrastructure.Data.Entities
{
    public class Order
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public Collaborator Collaborator { get; set; }

        public string? Service { get; set; }

        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public string? Name { get;set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public int? Tips { get; set; }

        public decimal? Price { get; set; }

        public string? Description { get; set; }

        public string? Zalo { get; set; }

        public int? Times { get; set; }

        public int? Status { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? ConfirmedDate { get; set; }

        public Review? Review { get; set; }

        public decimal? Amount { get; set; }

    }
}

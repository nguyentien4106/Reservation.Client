using System.ComponentModel.DataAnnotations;

namespace Reservation.Server.Data.Entities
{
    public class CollaboratorProfile
    {
        public Guid Id { get; set; }

        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; } = null!;

        [Required]
        public string NickName { get; set; }

        public bool? IsReady { get; set; }

        [Required]
        [Length(10, 11)]
        public string PhoneNumber { get; set; }

        public string? Email{ get; set;}

        public string? City { get; set; }

        public string? District { get; set; }

        public DateTime? BirthDate { get; set; }

        public int? PricePerHour { get; set; }

        public DateTime? JoinedDate { get; set; }

        public string? Introduction { get; set; }

        [Required]
        public string Title { get; set; }

        public List<Service> Services { get; set; } = [];

        public string? Status { get; set; }

    }
}

using System.ComponentModel.DataAnnotations;

namespace Reservation.Server.Data.Entities
{
    public class Collaborator
    {
        public Guid Id { get; set; }

        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; } = null!;

        public View View { get; set; }

        [Required]
        public string NickName { get; set; } =string.Empty;

        public bool? IsReady { get; set; }

        [Required]
        [Length(10, 11)]
        public string PhoneNumber { get; set; } = string.Empty;

        public string? Email{ get; set;}

        public string? City { get; set; }

        public string? District { get; set; }

        public DateTime? BirthDate { get; set; }

        public int? PricePerHour { get; set; }

        public DateTime? JoinedDate { get; set; }

        public string? Introduction { get; set; }

        public int? Height { get; set; }

        public int? Weight { get; set; }

        public string? Job { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public List<CollaboratorService> CollaboratorServices { get; set; } = [];

        public int? Status { get; set; }

        public string? Sex { get; set; }

        public string? OtherServices { get; set; }

    }
}

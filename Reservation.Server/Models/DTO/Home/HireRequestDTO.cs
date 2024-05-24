using Reservation.Server.Data;
using Reservation.Server.Models.DTO.Collaborator;

namespace Reservation.Server.Models.DTO.Home
{
    public class HireRequestDTO
    {
        public Guid? CollaboratorId { get; set; }

        public CollaboratorDTO? Collaborator { get; set; }

        public string ApplicationUserId { get; set; }

        public ApplicationUser? User { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public int? Offer { get; set; }

        public int? Times { get; set; }

        public string? Description { get; set; }

        public string? Zalo { get; set; }

        public string? CollaboratorEmail { get; set; }

    }
}

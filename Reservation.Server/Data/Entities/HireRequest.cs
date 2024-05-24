namespace Reservation.Server.Data.Entities
{
    public class HireRequest
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public Collaborator Collaborator { get; set; }

        public string ApplicationUserId { get; set; }

        public ApplicationUser User { get; set; } = null!;

        public string? Name { get;set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public int? Offer { get; set; }

        public string? Description { get; set; }

        public string? Zalo { get; set; }

        public int? Times { get; set; }

    }
}

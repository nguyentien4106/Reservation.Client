namespace Reservation.Server.Models.DTO.Collaborator
{
    public class CollaboratorServiceDTO
    {
        public Guid ServiceId { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public Guid CollaboratorId { get; set; }

    }
}

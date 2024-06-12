namespace Reservation.API.Data.Entities
{
    public class View
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public Collaborator Collaborator { get; set; } = null!;

        public int Count { get; set; }

    }
}

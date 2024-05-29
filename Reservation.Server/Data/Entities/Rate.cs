namespace Reservation.Server.Data.Entities
{
    public class Rate
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public Collaborator Collaborator { get; set; } = null!;

        public Int64 Sum { get; set; }

        public int Count { get; set; }

    }
}

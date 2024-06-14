namespace Reservation.Infrastructure.Data.Entities
{
    public class CollaboratorService
    {
        public Guid ServiceId { get; set; }

        public Service Service { get; set; }

        public Guid CollaboratorId { get; set; }

        public Collaborator Collaborator { get; set; }

        public decimal? Price { get; set; }
    }
}

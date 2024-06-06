namespace Reservation.Server.Data.Entities
{
    public class Service
    {
        public Guid Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public List<CollaboratorService> CollaboratorServices { get; set; } = [];

        public List<JobService> JobServices { get; set; } = [];
    }
}

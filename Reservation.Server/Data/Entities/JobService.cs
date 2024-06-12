namespace Reservation.Server.Data.Entities
{
    public class JobService
    {
        public Guid ServiceId { get; set; }

        public Service Service { get; set; }

        public Guid JobId { get; set; }

        public Job Job { get; set; }

    }
}

namespace Reservation.Server.Data.Entities
{
    public class JobService
    {
        public Guid ServiceId { get; set; }

        public Service Service { get; set; }

        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

    }
}

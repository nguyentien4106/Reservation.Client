namespace Reservation.Server.Data.Entities
{
    public class Review
    {
        public Guid Id { get; set; }

        public Guid OrderId { get; set; }

        public Order Order { get; set; } = null!;

        public int Rate { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateTime? CreatedDate { get; set; }

        public bool Recommend { get; set; }

    }
}

namespace Reservation.Infrastructure.Data.Entities
{
    public class Contract
    {
        public Guid Id { get; set; }

        public Guid JobId { get; set; }

        public Job Job { get; set; }

        public string LesseeId { get; set; }

        public ApplicationUser LesseeUser { get; set; }

        public string LessorId { get; set; }

        public ApplicationUser LessorUser { get; set; }

        public string? Description { get; set; }

        public string? Contact { get; set; }    

        public int Status { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.Now;

    }
}

namespace Reservation.Domain.Models.DTO.Jobs
{
    public class ContractDTO
    {
        public Guid Id { get; set; }

        public Guid JobId { get; set; }

        public string LesseeId { get; set; } = string.Empty;

        public string LessorId { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? Contact { get; set; }

        public int Status { get; set; }

        public DateTime? CreatedDate { get; set; }
    }
}

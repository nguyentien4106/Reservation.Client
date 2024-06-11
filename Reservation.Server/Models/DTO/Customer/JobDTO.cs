using Reservation.Server.Data.Entities;
using Reservation.Server.Data;

namespace Reservation.Server.Models.DTO.Customer
{
    public class JobDTO
    {
        public string ApplicationUserId { get; set; }

        public required string Title { get; set; }

        public string? Description { get; set; }

        public string? Required { get; set; }

        public decimal Cast { get; set; }

        public required string Location { get; set; }

        public required DateTime DateTime { get; set; }

        public List<JobServiceDTO> Services { get; set; } = [];

        public int? PaymentType { get; set; }

        public int? Status { get; set; }

    }
}

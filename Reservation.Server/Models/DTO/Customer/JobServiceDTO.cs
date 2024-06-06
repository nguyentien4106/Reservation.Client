using Reservation.Server.Data;

namespace Reservation.Server.Models.DTO.Customer
{
    public class JobServiceDTO
    {
        public Guid ServiceId { get; set; }

        public string ApplicationUserId { get; set; }

        public decimal? Price { get; set; }
    }
}

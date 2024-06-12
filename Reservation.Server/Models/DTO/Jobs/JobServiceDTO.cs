using Reservation.Server.Data;

namespace Reservation.API.Models.DTO.Jobs
{
    public class JobServiceDTO
    {
        public Guid ServiceId { get; set; }

        public Guid JobId { get; set; }

        public string? ServiceName { get; set; }
    }
}

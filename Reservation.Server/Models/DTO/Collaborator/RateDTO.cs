namespace Reservation.Server.Models.DTO.Collaborator
{
    public class RateDTO
    {
        public Guid CollaboratorId { get; set; }

        public Int64 Sum { get; set; }

        public int Count { get; set; }
    }
}

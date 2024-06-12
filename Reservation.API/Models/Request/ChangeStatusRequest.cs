namespace Reservation.API.Models.Request
{
    public class ChangeStatusRequest
    {
        public Guid? CollaboratorId { get; set; }

        public int Status { get; set; }
    }
}

namespace Reservation.Domain.Models.Request.Collaborators
{
    public class GetAllRequest : PagingRequest
    {
        public string City { get; set; } = string.Empty;

        public string District { get; set; } = string.Empty;

        public string Sex { get; set; } = string.Empty;

        public int OrderType { get; set; } = 0;
    }
}

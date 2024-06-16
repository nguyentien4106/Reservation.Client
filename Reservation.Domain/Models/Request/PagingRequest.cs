namespace Reservation.Domain.Models.Request
{
    public class PagingRequest
    {
        public int PageSize { get; set; } = 20;

        public int PageIndex { get; set; } = 0;

    }
}

namespace Reservation.Domain.Models.DTO.Common
{
    public class PaginationModel
    {
        public int PageSize { get; set; } = 20;

        public int PageIndex { get; set; } = 0;
    }
}

namespace Reservation.Domain.Models.ViewModel
{
    public class PagingViewModel<T>(int total, T data) where T : class
    {
        public PagingViewModel() : this(0, null)
        {

        }

        public int Total { get; set; } = total;

        public T Data { get; set; } = data;
    }
}

using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Customer;
using Reservation.Server.Models.DTO.Home;

namespace Reservation.Server.Serivces.Customer
{
    public interface ICustomerService
    {
        Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(string? applicationUserId);

        Task<AppResponse<OrderDTO>> AddReviewAsync(ReviewDTO review);

        Task<AppResponse<bool>> CreateOrderAsync(OrderDTO request);

        Task<AppResponse<bool>> CreateJobAsync(JobDTO job);

    }
}

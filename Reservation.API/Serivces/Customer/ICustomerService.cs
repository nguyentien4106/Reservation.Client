using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Customer;
using Reservation.API.Models.DTO.Home;
using Reservation.API.Models.DTO.Jobs;

namespace Reservation.API.Serivces.Customer
{
    public interface ICustomerService
    {
        Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(string? applicationUserId);

        Task<AppResponse<OrderDTO>> AddReviewAsync(ReviewDTO review);

        //Task<AppResponse<bool>> CreateOrderAsync(OrderDTO request);

        Task<AppResponse<bool>> CreateJobAsync(JobDTO job);

    }
}

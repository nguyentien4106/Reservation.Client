using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Customer;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.DTO.Jobs;

namespace Reservation.Application.Serivces.Customer
{
    public interface ICustomerService
    {
        Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(string? applicationUserId);

        Task<AppResponse<OrderDTO>> AddReviewAsync(ReviewDTO review);

        //Task<AppResponse<bool>> CreateOrderAsync(OrderDTO request);

        Task<AppResponse<bool>> CreateJobAsync(JobDTO job);

    }
}

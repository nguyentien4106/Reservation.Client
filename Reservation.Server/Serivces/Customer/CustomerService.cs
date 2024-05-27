using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Data.Entities;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Customer;
using Reservation.Server.Models.DTO.Home;

namespace Reservation.Server.Serivces.Customer
{
    public class CustomerService(ApplicationDbContext context, IMapper mapper) : ICustomerService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        public async Task<AppResponse<OrderDTO>> AddReviewAsync(ReviewDTO reviewDto)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(item => item.Id == reviewDto.OrderId);
            if(order == null)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("bind", "Order không được tìm thấy");
            }
            var review = _mapper.Map<Review>(reviewDto);
            review.CreatedDate = DateTime.Now;


            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            var orderDto = _mapper.Map<OrderDTO>(review.Order);

            return new AppResponse<OrderDTO>().SetSuccessResponse(orderDto);
        }

        public async Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(string? applicationUserId)
        {
            if (string.IsNullOrEmpty(applicationUserId))
            {
                return new AppResponse<List<OrderDTO>>().SetErrorResponse("bind", "Không tìm thấy User");
            }

            var orders = await _context.Orders
                .Include(item => item.Review)
                .Where(item => item.ApplicationUserId == applicationUserId)
                .Include(item => item.Collaborator)
                .ToListAsync();

            return new AppResponse<List<OrderDTO>>().SetSuccessResponse(_mapper.Map<List<OrderDTO>>(orders));
        }
    }
}

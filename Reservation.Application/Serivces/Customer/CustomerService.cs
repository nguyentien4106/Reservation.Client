using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Customer;
using Reservation.Domain.Models.DTO.Email;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Applicattion.Serivces.Email;
using Reservation.Application.Serivces.Customer;

namespace Reservation.Application.Serivces.Customer
{
    public class CustomerService(ApplicationDbContext context, IMapper mapper, IEmailService emailService) 
        : ICustomerService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;

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

            var rate = await _context.Rates.SingleOrDefaultAsync(item => item.CollaboratorId == order.CollaboratorId);
            if(rate != null)
            {
                rate.Sum += reviewDto.Rate;
                rate.Count += 1;
            }
            else
            {
                rate = new Rate
                {
                    Sum = reviewDto.Rate,
                    Count = 1,
                    CollaboratorId = order.CollaboratorId
                };

                await _context.Rates.AddAsync(rate);
            }

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

        //public async Task<AppResponse<bool>> CreateOrderAsync(OrderDTO request)
        //{
        //    if (string.IsNullOrEmpty(request.ApplicationUserId))
        //    {
        //        return new AppResponse<bool>().SetErrorResponse("user", "User trống!");
        //    }

        //    var order = _mapper.Map<Order>(request);
        //    order.Status = (int)OrderStatus.Sent;
        //    order.CreatedDate = DateTime.Now;

        //    await _context.Orders.AddAsync(order);

        //    await _context.SaveChangesAsync();

        //    var email = new EmailContent()
        //    {
        //        Subject = "Bạn đang có một người muốn thuê mới.",
        //        ToEmail = request.CollaboratorEmail,
        //        ToName = request.NickName ?? "Customer",
        //    };

        //    var sended = _emailService.SendEmailNewOrder(email, request);

        //    if (!sended)
        //    {
        //        return new AppResponse<bool>().SetErrorResponse("email", "Đã gửi yêu cầu thành công nhưng chưa gửi được email !");
        //    }

        //    return new AppResponse<bool>().SetSuccessResponse(true);
        //}

        public async Task<AppResponse<bool>> CreateJobAsync(JobDTO jobDTO)
        {
            if (string.IsNullOrEmpty(jobDTO.ApplicationUserId))
            {
                return new AppResponse<bool>().SetErrorResponse("user", "User không tìm thấy thử lại");
            }

            var job = _mapper.Map<Job>(jobDTO);
            await _context.Jobs.AddAsync(job);    
            await _context.SaveChangesAsync();

            return new AppResponse<bool>().SetSuccessResponse(true);
        }
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Customer;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Application.Serivces.Email;
using Reservation.Application.Serivces.IRepositories;
using System.Linq.Expressions;
using OrderEntity = Reservation.Infrastructure.Data.Entities.Order;
using Reservation.Domain.Models.Enum;
using Reservation.Domain.Extensions;

namespace Reservation.Application.Serivces.Customer
{
    public class CustomerService(
        IMapper mapper, 
        IEmailService emailService,
        IUnitOfWork unitOfWork
    ) 
        : ICustomerService
    {
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<AppResponse<Guid>> AddReviewAsync(ReviewDTO reviewDto)
        {
            Expression<Func<OrderEntity, bool>> filterByOrder = o => o.Id == reviewDto.OrderId;
            var order = await _unitOfWork.Orders
                .SingleOrDefaultAsync(
                filterByOrder, 
                include: o => o.Include(item => item.Collaborator).ThenInclude(item => item.ApplicationUser));
            if(order == null)
            {
                return new AppResponse<Guid>().SetErrorResponse("bind", "Order không được tìm thấy");
            }

            var review = _mapper.Map<Review>(reviewDto);
            review.CreatedDate = DateTime.Now;

            await _unitOfWork.Reviews.AddAsync(review);
            await _unitOfWork.Notifications.AddAsync(
                new Notification(
                    new Guid(order.Collaborator.ApplicationUserId),
                    (int)NotificationType.NewReview, 
                    new
                        {
                            Rate = review.Rate
                        }.ToJSON()
                    )
            );

            Expression<Func<Rate, bool>> filterRateByCollaborator = r => r.CollaboratorId == order.CollaboratorId;
            var rate = await _unitOfWork.Rates.SingleOrDefaultAsync(filterRateByCollaborator, tracking: true);
            if(rate != null)
            {
                rate.Sum += reviewDto.Rate;
                rate.Count += 1;
                _unitOfWork.Rates.Update(rate);
            }
            else
            {
                rate = new Rate
                {
                    Sum = reviewDto.Rate,
                    Count = 1,
                    CollaboratorId = order.CollaboratorId
                };

                await _unitOfWork.Rates.AddAsync(rate);
            }

            await _unitOfWork.CommitAsync();
            var orderDto = _mapper.Map<OrderDTO>(order);

            return new AppResponse<Guid>().SetSuccessResponse(order.Id);
        }

        public async Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(string? applicationUserId)
        {
            if (string.IsNullOrEmpty(applicationUserId))
            {
                return new AppResponse<List<OrderDTO>>().SetErrorResponse("bind", "Không tìm thấy User");
            }

            Expression<Func<OrderEntity, bool>> filterOrderByUser = ord => ord.ApplicationUserId == applicationUserId; ;
            var orders = await _unitOfWork.Orders.GetAllAsync(
                filters: [filterOrderByUser],
                include: o => o.Include(i => i.Review).Include(i => i.Collaborator)
            );
            
            return new AppResponse<List<OrderDTO>>().SetSuccessResponse(_mapper.Map<List<OrderDTO>>(orders));
        }

        public async Task<AppResponse<bool>> CreateJobAsync(JobDTO jobDTO)
        {
            if (string.IsNullOrEmpty(jobDTO.ApplicationUserId))
            {
                return new AppResponse<bool>().SetErrorResponse("user", "User không tìm thấy thử lại");
            }

            var job = _mapper.Map<Job>(jobDTO);
            await _unitOfWork.Jobs.AddAsync(job);    
            await _unitOfWork.CommitAsync();

            return new AppResponse<bool>().SetSuccessResponse(true);
        }
    }
}

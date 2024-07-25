using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.Enum;
using Reservation.Application.Serivces.Email;
using Microsoft.AspNetCore.Hosting;
using Reservation.Application.Serivces.Email.EmailBody;
using Reservation.Application.Serivces.IRepositories;
using System.Linq.Expressions;
using OrderEntity = Reservation.Infrastructure.Data.Entities.Order;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Extensions;

namespace Reservation.Application.Serivces.Order
{
    public class OrderService(
        ApplicationDbContext context, 
        IMapper mapper, 
        IEmailService emailService,
        IHostingEnvironment hostingEnvironment,
        TokenSettings tokenSettings,
        IUnitOfWork unitOfWork
    ) 
        : IOrderService
    {
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;
        private readonly IHostingEnvironment _hostingEnvironment = hostingEnvironment;
        private readonly TokenSettings _tokenSettings = tokenSettings;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<AppResponse<OrderDTO>> ComfirmOrderAsync(Guid? orderId, int status)
        {
            if (!orderId.HasValue)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("bind", "Không tìm thấy request");
            }

            Expression<Func<OrderEntity, bool>> filterById = o => o.Id == orderId;

            var order = await _unitOfWork.Orders
                .SingleOrDefaultAsync(
                    filterById, 
                    include: o => o.Include(i => i.ApplicationUser).Include(item => item.Collaborator));

            if (order == null)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("request", "Không tìm thấy request trả về");
            }

            order.Status = status;
            order.ConfirmedDate = DateTime.Now;
            _unitOfWork.Orders.Update(order);

            await _unitOfWork.Notifications
                .AddAsync(
                new Notification(
                    order.ApplicationUserId, 
                    (int)NotificationType.NewStatusOrder, 
                    new 
                    {
                        Status = status,
                        Collaborator = order.Collaborator.NickName,
                    }.ToJSON()));

            await _unitOfWork.CommitAsync();

            var emailBuilder = new EmailBuilder();
            emailBuilder.SetFrom("ThueNguoiYeu.me", "customer-support@ThueNguoiYeu.me.com");
            emailBuilder.SetTo(order.Name, order.Email);
            emailBuilder.SetSubject("Thông báo mới về yêu cầu cho thuê.");
            emailBuilder.SetBody(
                new OrderConfirmationEmailBodyBuilder(_hostingEnvironment, _tokenSettings, order)
                .GetBodyBuilder()
            );

            var sent = _emailService.Sent(emailBuilder.Build());

            if (!sent)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("mail", "Đã xác nhận thành công nhưng chưa thể gửi email cho người yêu cầu");
            }

            return new AppResponse<OrderDTO>().SetSuccessResponse(_mapper.Map<OrderDTO>(order));
        }

        public async Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(Guid? collaboratorId)
        {
            if (!collaboratorId.HasValue)
            {
                return new AppResponse<List<OrderDTO>>().SetErrorResponse("user", "Không tìm thấy User");
            }
            Expression<Func<OrderEntity, bool>> filterByCollaboratorId = o => o.CollaboratorId == collaboratorId;

            var orders = await _unitOfWork.Orders.GetAllAsync(filters: [filterByCollaboratorId]);

            return new AppResponse<List<OrderDTO>>().SetSuccessResponse(_mapper.Map<List<OrderDTO>>(orders.ToList()));
        }

        public async Task<AppResponse<bool>> CreateOrderAsync(OrderDTO orderDTO)
        {
            if (string.IsNullOrEmpty(orderDTO.ApplicationUserId) || orderDTO == null)
            {
                return new AppResponse<bool>().SetErrorResponse("user", "Không tìm thấy user!");
            }

            var order = _mapper.Map<OrderEntity>(orderDTO);
            order.Status = (int)OrderStatus.Sent;
            order.CreatedDate = DateTime.Now;
            
            await _unitOfWork.Orders.AddAsync(order);
            Expression<Func<ApplicationUser, bool>> filterByUser = o => o.Collaborator.Id == order.CollaboratorId;
            var user = await _unitOfWork.ApplicationUsers.SingleOrDefaultAsync(filterByUser);
            await _unitOfWork.Notifications.AddAsync(
                new Notification(
                    user?.Id, 
                    (int)NotificationType.NewOrder, 
                    new 
                    {
                        UserName = user.UserName,
                        OrderId = order.Id
                    }.ToJSON()
            )); 
            await _unitOfWork.CommitAsync();

            var emailBuilder = new EmailBuilder();
            emailBuilder.SetFrom("ThueNguoiYeu.me", "customer-support@ThueNguoiYeu.me");
            emailBuilder.SetTo(orderDTO.NickName ?? "Customer", orderDTO?.CollaboratorEmail ?? "nguyenvantien0620@gmail.com");
            emailBuilder.SetSubject("Bạn có một người muốn thuê mới.");
            emailBuilder.SetBody(new NewOrderEmailBodyBuiler(_hostingEnvironment, orderDTO, orderDTO.NickName ?? "Customer").GetBodyBuilder());
            
            var sended = _emailService.Sent(emailBuilder.Build()); 

            if (!sended)
            {
                return new AppResponse<bool>().SetErrorResponse("email", "Đã gửi yêu cầu thành công nhưng chưa gửi được email !");
            }

            return new AppResponse<bool>().SetSuccessResponse(true);
        }

        public async Task<AppResponse<List<OrderDTO>>> GetOrdersAsync(string? applicationUserId)
        {
            if (string.IsNullOrEmpty(applicationUserId))
            {
                return new AppResponse<List<OrderDTO>>().SetErrorResponse("user", "Không tìm thấy User");
            }

            Expression<Func<OrderEntity, bool>> filterByUser = o => o.ApplicationUserId == applicationUserId;

            var orders = await _unitOfWork.Orders.GetAllAsync(
                    filters: [filterByUser], 
                    include: o => o.Include(i => i.Collaborator).Include(i => i.Review)
            );

            return new AppResponse<List<OrderDTO>>().SetSuccessResponse(_mapper.Map<List<OrderDTO>>(orders.ToList()));

        }
    }
}

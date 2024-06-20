using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Email;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.Enum;
using Reservation.Applicattion.Serivces.Email;
using Microsoft.AspNetCore.Hosting;
using Reservation.Application.Serivces.Email.EmailBody;

namespace Reservation.Application.Serivces.Order
{
    public class OrderService(
        ApplicationDbContext context, 
        IMapper mapper, 
        IEmailService emailService,
        IHostingEnvironment hostingEnvironment,
        TokenSettings tokenSettings
    ) 
        : IOrderService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;
        private readonly IHostingEnvironment _hostingEnvironment = hostingEnvironment;
        private readonly TokenSettings _tokenSettings = tokenSettings;

        public async Task<AppResponse<OrderDTO>> ComfirmOrderAsync(Guid? orderId, int status)
        {
            if (!orderId.HasValue)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("bind", "Không tìm thấy request");
            }

            var order = await _context.Orders.Include(order => order.ApplicationUser).SingleOrDefaultAsync(item => item.Id == orderId);

            if (order == null)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("request", "Không tìm thấy request trả về");
            }

            order.Status = status;
            order.ConfirmedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            var collaborator = await _context.Collaborators.Include(item => item.ApplicationUser).SingleOrDefaultAsync(item => item.Id == order.CollaboratorId);

            var emailBuilder = new EmailBuilder();
            emailBuilder.SetFrom("ThueNguoiYeu.me", "customer-support@ThueNguoiYeu.me.com");
            emailBuilder.SetTo(order.Name, order.Email);
            emailBuilder.SetSubject("Thông báo mới về yêu cầu cho thuê.");
            emailBuilder.SetBody(
                new OrderConfirmationEmailBodyBuilder(_hostingEnvironment, _tokenSettings, order).GetBodyBuilder()
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

            var orders = await _context.Orders.Where(item => item.CollaboratorId == collaboratorId).ToListAsync();

            return new AppResponse<List<OrderDTO>>().SetSuccessResponse(_mapper.Map<List<OrderDTO>>(orders));
        }

        public async Task<AppResponse<bool>> CreateOrderAsync(OrderDTO orderDTO)
        {
            if (string.IsNullOrEmpty(orderDTO.ApplicationUserId) || orderDTO == null)
            {
                return new AppResponse<bool>().SetErrorResponse("user", "User trống!");
            }

            var order = _mapper.Map<Reservation.Infrastructure.Data.Entities.Order>(orderDTO);
            order.Status = (int)OrderStatus.Sent;
            order.CreatedDate = DateTime.Now;

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            var emailBuilder = new EmailBuilder();
            emailBuilder.SetFrom("ThueNguoiYeu.me", "customer-support@ThueNguoiYeu.me.com");
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

            var orders = await _context.Orders
                .Where(item => item.ApplicationUserId == applicationUserId)
                .Include(item => item.Collaborator)
                .Include(item => item.Review)
                .ToListAsync();

            return new AppResponse<List<OrderDTO>>().SetSuccessResponse(_mapper.Map<List<OrderDTO>>(orders));

        }
    }
}

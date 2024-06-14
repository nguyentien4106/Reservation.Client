using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Email;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.Enum;
using Reservation.Applicattion.Serivces.Email;

namespace Reservation.Application.Serivces.Order
{
    public class OrderService(ApplicationDbContext context, IMapper mapper, IEmailService emailService) : IOrderService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;

        public async Task<AppResponse<OrderDTO>> ComfirmOrderAsync(Guid? requestId, int status)
        {
            if (!requestId.HasValue)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("bind", "Không tìm thấy request");
            }

            var request = await _context.Orders.SingleOrDefaultAsync(item => item.Id == requestId);

            if (request == null)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("request", "Không tìm thấy request trả về");
            }

            request.Status = status;
            request.ConfirmedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            var collaborator = await _context.Collaborators.SingleOrDefaultAsync(item => item.Id == request.CollaboratorId);
            var email = new EmailContent()
            {
                ToEmail = request.Email,
                ToName = request.Name,
                Subject = "Thông báo mới về yêu cầu cho thuê",
                Content = $"{collaborator?.NickName ?? ""} đã xác nhận yêu cầu cho thuê của bạn đã tạo vào hồi {request.CreatedDate}. Xin hãy kiểm tra lại trang phản hồi để biết thêm thông tin chi tiết và số diện thoại của CTV. Nếu xảy ra bất cứ vấn đề xin hãy liên lạc lại chúng tôi để giải quyết yêu cầu."
            };

            var sent = _emailService.SendMail(email);

            if (!sent)
            {
                return new AppResponse<OrderDTO>().SetErrorResponse("mail", "Đã xác nhận thành công nhưng chưa thể gửi email cho người yêu cầu");
            }

            return new AppResponse<OrderDTO>().SetSuccessResponse(_mapper.Map<OrderDTO>(request));
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
            if (string.IsNullOrEmpty(orderDTO.ApplicationUserId))
            {
                return new AppResponse<bool>().SetErrorResponse("user", "User trống!");
            }

            var order = _mapper.Map<Reservation.Infrastructure.Data.Entities.Order>(orderDTO);
            order.Status = (int)OrderStatus.Sent;
            order.CreatedDate = DateTime.Now;

            await _context.Orders.AddAsync(order);

            await _context.SaveChangesAsync();

            var email = new EmailContent()
            {
                Subject = "Bạn đang có một người muốn thuê mới.",
                ToEmail = orderDTO.CollaboratorEmail,
                ToName = orderDTO.NickName ?? "Customer",
            };

            var sended = _emailService.SendEmailNewOrder(email, orderDTO);

            if (!sended)
            {
                return new AppResponse<bool>().SetErrorResponse("email", "Đã gửi yêu cầu thành công nhưng chưa gửi được email !");
            }

            return new AppResponse<bool>().SetSuccessResponse(true);
        }
    }
}

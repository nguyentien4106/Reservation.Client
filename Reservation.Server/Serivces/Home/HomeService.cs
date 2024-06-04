using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Data.Entities;
using Reservation.Server.Extensions;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.DTO.Email;
using Reservation.Server.Models.DTO.Home;
using Reservation.Server.Models.Enum;
using Reservation.Server.Serivces.Email;

namespace Reservation.Server.Serivces.Home
{
    public class HomeService(ApplicationDbContext context, IMapper mapper, IEmailService emailService) : IHomeService
    {
        private readonly IEmailService _emailService = emailService;
        private readonly ApplicationDbContext _context = context;
        private readonly IMapper _mapper = mapper;

        private const string All = "All";

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync()
        {
            var collaborators = await _context.Collaborators.Include(item=> item.View).Where(item => item.IsReady == true).ToListAsync();

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators).OrderByAvgRate());
        }

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(string city, string district, string sex, int orderType)
        {
            var query = _context.Collaborators.Include(item => item.View).AsQueryable();

            query = query.Where(collaborator => city == All || collaborator.City == city);

            query = query.Where(collaborator => district == All || collaborator.District == district);

            query = query.Where(collaborator => sex == All || collaborator.Sex == sex);

            var result = await query.ToListAsync();

            if(result== null)
            {
                return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse([]);
            }
            var collaboratorDtos = _mapper.Map<List<CollaboratorDTO>>(result);

            switch (orderType)
            {
                case (int)OrderFilterType.PriceIncreasing:
                    collaboratorDtos = collaboratorDtos.OrderByPrice();
                    break;

                case (int)OrderFilterType.PriceDecreasing:
                    collaboratorDtos = collaboratorDtos.OrderByPriceDecreasing();
                    break;

                case (int)OrderFilterType.RateCountIncreasing:
                    collaboratorDtos = collaboratorDtos.OrderByRateCount();
                    break;

                case (int)OrderFilterType.RateCountDecreasing:
                    collaboratorDtos = collaboratorDtos.OrderByRateCountDecreasing();
                    break;

                case (int)OrderFilterType.AgeIncreasing:
                    collaboratorDtos = collaboratorDtos.OrderByAge();
                    break;

                case (int)OrderFilterType.AgeDecreasing:
                    collaboratorDtos = collaboratorDtos.OrderByAgeDecreasing();
                    break;
            }

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(collaboratorDtos);
        }

        public async Task<AppResponse<bool>> CreateOrderAsync(OrderDTO request)
        {
            if (string.IsNullOrEmpty(request.ApplicationUserId))
            {
                return new AppResponse<bool>().SetErrorResponse("user", "User trống!");
            }

            var hireRequest = _mapper.Map<Order>(request);
            hireRequest.Status = (int)OrderStatus.Sent;
            hireRequest.CreatedDate = DateTime.Now;

            await _context.Orders.AddAsync(hireRequest);

            await _context.SaveChangesAsync();

            var email = new EmailContent()
            {
                Subject = "Bạn đang có một người muốn thuê mới.",
                ToEmail = request.CollaboratorEmail,
                ToName = "Collaborator Name",
                Content = BuildContent(request)
            };

            var sended = _emailService.SendMail(email);

            if (!sended)
            {
                return new AppResponse<bool>().SetErrorResponse("email", "Đã gửi yêu cầu thành công nhưng chưa gửi được email !");
            }

            return new AppResponse<bool>().SetSuccessResponse(true);
        }

        private static string BuildContent(OrderDTO request)
        {
            return $"Một khách hàng có tên {request.Name}, có số điện thoại {request.PhoneNumber}, đã đề nghị thuê bạn {request.Times} giờ với mức giá {request.Tips} mỗi giờ";
        }
    }
}

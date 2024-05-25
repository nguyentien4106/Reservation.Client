using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Data.Entities;
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

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators));
        }

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(string city, string district, string sex, int maxAge)
        {
            var query = _context.Collaborators.Include(item => item.View).AsQueryable();

            query = query.Where(collaborator => city == All || collaborator.City == city);

            query = query.Where(collaborator => district == All || collaborator.District == district);

            query = query.Where(collaborator => sex == All || collaborator.Sex == sex);

            var result = await query.ToListAsync();

            result = result.Where(item => GetAge(item.BirthDate.GetValueOrDefault()) <= maxAge).ToList();

            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(result));
        }

        private static int GetAge(DateTime? birthDate)
        {
            if (!birthDate.HasValue)
            {
                return 0;
            }

            var year = birthDate.Value.Year;

            return DateTime.Today.Year - year;
        }

        public async Task<AppResponse<bool>> SendHireRequestAsync(HireRequestDTO request)
        {
            if (string.IsNullOrEmpty(request.ApplicationUserId))
            {
                return new AppResponse<bool>().SetErrorResponse("user", "User trống!");
            }

            //if (!request.CollaboratorId)
            //{
            //    return new AppResponse<bool>().SetErrorResponse("user", "Không tìm thấy dữ liệu của người cho thuê");
            //}

            var hireRequest = _mapper.Map<HireRequest>(request);
            hireRequest.Status = (int)HireRequestStatus.Sent;
            hireRequest.CreatedDate = DateTime.Now;

            await _context.HireRequests.AddAsync(hireRequest);

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

        private static string BuildContent(HireRequestDTO request)
        {
            return $"Một khách hàng có tên {request.Name}, có số điện thoại {request.PhoneNumber}, đã đề nghị thuê bạn {request.Times} giờ với mức giá {request.Offer} mỗi giờ";
        }
    }
}

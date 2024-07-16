using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reservation.Application.Serivces.IRepositories;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Domain.Models.Request;
using Reservation.Domain.Models.ViewModel;
using Reservation.Infrastructure.Data.Entities;
using System.Linq.Expressions;

namespace Reservation.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class NotificationsController(IUnitOfWork unitOfWork) : Controller
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        [HttpGet]
        [Route("Users/{userId}")]
        public async Task<PagingViewModel<List<Notification>>> GetAll(string userId, [FromQuery] PagingRequest paging)
        {
            Expression<Func<Notification, bool>> filterByUser = noti => noti.ApplicationUserId.ToString() == userId;
            return await _unitOfWork.Notifications.GetAllAsync(filters: [filterByUser], paging: paging, orderBy: o => o.OrderByDescending(item => item.CreatedDate));
        }

        [HttpGet]
        [Route("{notificationId}")]
        public async Task<bool> Read(Guid notificationId)
        {
            Expression<Func<Notification, bool>> filter = noti => noti.Id == notificationId;
            var notification = await _unitOfWork.Notifications.SingleOrDefaultAsync(filter);
            notification.Read = true;

            _unitOfWork.Notifications.Update(notification);
            await _unitOfWork.CommitAsync();
            return true;
        }
    }
}

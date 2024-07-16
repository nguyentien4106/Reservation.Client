using Reservation.Infrastructure.Data.Entities;
using OrderEntity = Reservation.Infrastructure.Data.Entities.Order;
using NotificationEntity = Reservation.Infrastructure.Data.Entities.Notification;
using Reservation.Infrastructure.Data;

namespace Reservation.Application.Serivces.IRepositories
{
    public interface IUnitOfWork
    {
        IRepository<Collaborator> Collaborators { get; }

        IRepository<CollaboratorService> CollaboratorServices { get; }

        IRepository<OrderEntity> Orders { get; }

        IRepository<Job> Jobs { get; }

        IRepository<Review> Reviews { get; }

        IRepository<Contract> Contracts { get; }

        IRepository<Rate> Rates { get; }

        IRepository<View> Views { get; }

        IRepository<NotificationEntity> Notifications { get; }

        IRepository<ApplicationUser> ApplicationUsers { get; }

        Task CommitAsync();

        void Rollback();
    }
}

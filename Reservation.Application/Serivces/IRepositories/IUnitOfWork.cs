using Reservation.Infrastructure.Data.Entities;
using OrderEntity = Reservation.Infrastructure.Data.Entities.Order;

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

        Task CommitAsync();

        void Rollback();
    }
}

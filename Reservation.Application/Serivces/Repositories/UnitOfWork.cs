using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reservation.Application.Serivces.IRepositories;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
using OrderEntity = Reservation.Infrastructure.Data.Entities.Order;

namespace Reservation.Application.Serivces.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        private bool disposed;

        private readonly Lazy<Repository<Collaborator>> _collaboratorRepo;
        private readonly Lazy<Repository<CollaboratorService>> _collaboratorServiceRepo;
        private readonly Lazy<Repository<OrderEntity>> _orderRepo;
        private readonly Lazy<Repository<Job>> _jobRepo;
        private readonly Lazy<Repository<Review>> _reviewRepo;
        private readonly Lazy<Repository<Contract>> _contractRepo;
        private readonly Lazy<Repository<Rate>> _rateRepo;
        private readonly Lazy<Repository<View>> _viewRepo;

        public UnitOfWork(
            ApplicationDbContext context,
            ILoggerFactory loggerFactory
        )
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("thuenguoiyeu-api-logs");
            _collaboratorRepo = InitLazyRepository<Collaborator>();
            _collaboratorServiceRepo = InitLazyRepository<CollaboratorService>();
            _orderRepo = InitLazyRepository<OrderEntity>();
            _jobRepo = InitLazyRepository<Job>();
            _reviewRepo = InitLazyRepository<Review>();
            _contractRepo = InitLazyRepository<Contract>();
            _rateRepo = InitLazyRepository<Rate>();
            _viewRepo = InitLazyRepository<View>();
        }

        public IRepository<Collaborator> Collaborators
        {
            get { return _collaboratorRepo.Value; }
        }

        public IRepository<CollaboratorService> CollaboratorServices
        {
            get { return _collaboratorServiceRepo.Value; }
        }

        public IRepository<OrderEntity> Orders
        {
            get { return _orderRepo.Value; }
        }

        public IRepository<Job> Jobs
        {
            get { return _jobRepo.Value; }
        }

        public IRepository<Review> Reviews
        {
            get { return _reviewRepo.Value; }
        }

        public IRepository<Contract> Contracts
        {
            get { return _contractRepo.Value; }
        }
        public IRepository<Rate> Rates
        {
            get { return _rateRepo.Value; }
        }
        public IRepository<View> Views
        {
            get { return _viewRepo.Value; }
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Rollback()
        {
            foreach (var entry in _context.ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                }
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private Lazy<Repository<T>> InitLazyRepository<T>() where T : class
        {
            return new Lazy<Repository<T>>(() =>
            {
                return new Repository<T>(_context, _logger);
            });
        }
    }
}

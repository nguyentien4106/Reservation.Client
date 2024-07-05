using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reservation.Application.Serivces.IRepositories;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
namespace Reservation.Application.Serivces.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        private bool disposed;

        private readonly Lazy<Repository<Collaborator>> _collaboratorRepo;

        public UnitOfWork(
            ApplicationDbContext context,
            ILoggerFactory loggerFactory
        )
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("thuenguoiyeu-api-logs");
            _collaboratorRepo = InitLazyRepository<Collaborator>();
        }

        public IRepository<Collaborator> Collaborators
        {
            get { return _collaboratorRepo.Value; }
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

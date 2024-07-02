using Microsoft.Extensions.Logging;
using Reservation.Application.Serivces.IRepositories;
using Reservation.Infrastructure.Data;
namespace Reservation.Application.Serivces.Repositories
{
    public class UnitOfWork(
        ApplicationDbContext context,
        ILoggerFactory loggerFactory
        ) : IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ILogger _logger = loggerFactory.CreateLogger("logs");

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}

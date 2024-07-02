using Reservation.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservation.Application.Serivces.IRepositories
{
    public interface IAccountRepository : IGenericRepository<ApplicationUser>
    {
    }
}

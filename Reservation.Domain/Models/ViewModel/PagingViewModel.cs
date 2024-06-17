using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservation.Domain.Models.ViewModel
{
    public class PagingViewModel<T> where T : class
    {
        public int Total { get; set; } = 0;

        public List<T> Data { get; set; } = [];
    }
}

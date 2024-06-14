using Reservation.Domain.Models.DTO.Common;

namespace Reservation.Domain.Extensions
{
    public static class PagingExtension
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> query, PaginationModel paging)
        {
            return query.Skip(paging.PageIndex * paging.PageSize).Take(paging.PageSize);
        }
    }
}

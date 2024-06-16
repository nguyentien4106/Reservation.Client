using Reservation.Domain.Models.Request;

namespace Reservation.Domain.Extensions
{
    public static class PagingExtension
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> query, PagingRequest paging)
        {
            return query.Skip(paging.PageIndex * paging.PageSize).Take(paging.PageSize);
        }

        public static IEnumerable<T> Paginate<T>(this IEnumerable<T> list, PagingRequest paging)
        {
            return list.Skip(paging.PageIndex * paging.PageSize).Take(paging.PageSize);
        }
    }
}

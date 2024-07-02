namespace Reservation.Application.Serivces.IRepositories
{
    public interface IGenericRepository<T> where T : class // T is a generic type, it means that it can be of any type
    {
        Task<IEnumerable<T>> All();

        Task<T> GetById(int id);

        Task<bool> Add(T entity);

        Task<bool> Delete(int id);

        Task<bool> Update(T entity);

        Task<bool> AddOrUpdate(T entity);
    }
}

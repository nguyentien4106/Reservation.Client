using Microsoft.EntityFrameworkCore.Query;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.Request;
using Reservation.Domain.Models.ViewModel;
using Reservation.Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Reservation.Application.Serivces.IRepositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync(
            Expression<Func<TEntity, bool>>[]? filters = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>>? include = null,
            bool disableTracking = true
        );

        Task<PagingViewModel<List<TEntity>>> GetAllAsync(
            PagingRequest paging,
            Expression<Func<TEntity, bool>>[]? filters = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>>? include = null,
            bool disableTracking = true
        );

        Task<TEntity> SingleOrDefaultAsync(
            Expression<Func<TEntity, bool>> filter,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>>? include = null
        );

        Task<TEntity> GetByIdAsync(object id);

        Task<bool> AddAsync(TEntity entity);

        Task<bool> AddRangeAsync(IEnumerable<TEntity> entity);

        bool Update(TEntity entity);

        Task<bool> DeleteByIdAsync(object id);

        bool DeleteByEntity(TEntity entity);

        bool DeleteByEntities(IEnumerable<TEntity> entities);
    }
}

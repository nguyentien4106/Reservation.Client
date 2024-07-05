﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.Extensions.Logging;
using Reservation.Application.Serivces.IRepositories;
using Reservation.Domain.Extensions;
using Reservation.Domain.Models.Request;
using Reservation.Domain.Models.ViewModel;
using Reservation.Infrastructure.Data;
using System.Linq;
using System.Linq.Expressions;

namespace Reservation.Application.Serivces.Repositories
{
    public class Repository<T>(ApplicationDbContext context, ILogger logger) : IRepository<T> where T : class
    {
        protected ApplicationDbContext _context = context;

        protected DbSet<T> _dbSet = context.Set<T>();

        protected readonly ILogger _logger = logger;

        public async Task<bool> AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Some errors occurs");
                return false;
            }
        }

        public bool DeleteByEntity(T entity)
        {
            try
            {
                if (_context.Entry(entity).State == EntityState.Detached)
                {
                    _dbSet.Attach(entity);
                }
                _dbSet.Remove(entity);
                return true;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Some errors occurs");
                return false;
            }
        }

        public async Task<bool> DeleteByIdAsync(object id)
        {
            if(id == null)
            {
                return false;
            }
            T entity = await _dbSet.FindAsync(id);
            if(entity == null)
            {
                return false;
            }

            return DeleteByEntity(entity);
        }

        public async Task<IEnumerable<T>> GetAllAsync(
            Expression<Func<T, bool>>[]? filters = null, 
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, 
            Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,
            bool disableTracking = true
        )
        {
            IQueryable<T> query = _dbSet;
            query = disableTracking ? query.AsNoTracking() : query.AsTracking();

            if (filters != null)
            {
                foreach(var filter in filters)
                {
                    query = query.Where(filter);
                }
            }

            if(include != null)
            {
                query = include(query);
            }

            IQueryable<T> result;

            if (orderBy != null)
            {
                result = orderBy(query);
            }
            else
            {
                result = query;
            }
            
            return await result.ToListAsync();
        }

        public async Task<PagingViewModel<IEnumerable<T>>> GetAllAsync(
            Expression<Func<T, bool>>[]? filters = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>>? include = null,
            bool disableTracking = true,
            PagingRequest? paging = null
        )
        {
            IQueryable<T> query = _dbSet;
            query = disableTracking ? query.AsNoTracking() : query.AsTracking();

            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    query = query.Where(filter);
                }
            }

            if (include != null)
            {
                query = include(query);
            }


            if (orderBy != null)
            {
                query = orderBy(query);
            }

            var result = new PagingViewModel<IEnumerable<T>>();

            if(paging != null)
            {
                result.Total = await query.CountAsync();
                query = query.Paginate(paging);
            }

            result.Data = await query.ToListAsync();

            return result;
        }

        public async Task<T> GetByIdAsync(object id)
        {
            return await _dbSet.FindAsync(id);
        }

        public bool Update(T entity)
        {
            try
            {
                _dbSet.Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update entity");
                return false;
            }
        }
    }
}

﻿using Reservation.Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservation.Application.Serivces.IRepositories
{
    public interface IUnitOfWork
    {
        IRepository<Collaborator> Collaborators { get; }

        Task CommitAsync();

        void Rollback();
    }
}

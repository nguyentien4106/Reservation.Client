using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;
using Reservation.Domain.Models.Enum;
using System.Linq.Expressions;
using Reservation.Application.Serivces.Email;
using Reservation.Application.Serivces.UserServiceRegister;
using Reservation.Domain.Extensions;
using Reservation.Domain.Models.Request.Collaborators;
using Reservation.Domain.Models.ViewModel;
using System.Collections.Generic;
using Reservation.Application.Serivces.IRepositories;
using System;
using OrderEntity = Reservation.Infrastructure.Data.Entities.Order;

namespace Reservation.Application.Serivces.UserServiceRegister
{
    public class CollaboratorService(
        ApplicationDbContext context, 
        UserManager<ApplicationUser> userManager, 
        IMapper mapper,
        IEmailService emailService,
        IUnitOfWork unitOfWork
    ) 
        : ICollaboratorService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly IMapper _mapper = mapper;
        private readonly IEmailService _emailService = emailService;
        private const string All = "All";
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<AppResponse<CollaboratorDTO>> GetProfileAsync(Guid? collaboratorId)
        {
            if (collaboratorId == null || !collaboratorId.HasValue)
            {
                return new AppResponse<CollaboratorDTO>().SetErrorResponse("id", $"{collaboratorId} not found!");
            }

            Expression<Func<Collaborator, bool>> filter = item => item.Id == collaboratorId;

            var collaborator = await _unitOfWork.Collaborators
                .SingleOrDefaultAsync(
                    filter, 
                    include: o => o.Include(i => i.View)
                                    .Include(i => i.CollaboratorServices)
                                    .ThenInclude(i => i.Service)
            );

            if (collaborator == null)
            {
                return new AppResponse<CollaboratorDTO>().SetErrorResponse("id", "User not found!");
            }

            Expression<Func<OrderEntity, bool>> filterByCollaborator = o => o.CollaboratorId == collaboratorId;
            var orders = await _unitOfWork.Orders.GetAllAsync(
                filters: [filterByCollaborator],
                include: o => o.Include(i => i.Review).Include(item => item.Collaborator)
            );

            collaborator.Orders = orders.ToList();
            
            await UpdateView(collaborator);

            return new AppResponse<CollaboratorDTO>().SetSuccessResponse(_mapper.Map<CollaboratorDTO>(collaborator));
        }

        public async Task<AppResponse<string>> AddAsync(CollaboratorDTO dto)
        {
            var newCollaborator = _mapper.Map<Collaborator>(dto);
            newCollaborator.Status = (int)ProfileStatus.Reviewing;
            newCollaborator.JoinedDate = DateTime.Now;

            await _unitOfWork.Collaborators.AddAsync(newCollaborator);
            await _unitOfWork.CommitAsync();

            return new AppResponse<string>().SetSuccessResponse(newCollaborator.Id.ToString());
        }

        public async Task<AppResponse<string>> UpdateAsync(CollaboratorDTO dto)
        {
            if (!dto.Id.HasValue)
            {
                return new AppResponse<string>().SetErrorResponse("user", "User not found");
            }
            Expression<Func<Collaborator, bool>> filter = c => c.Id == dto.Id;
            var collaborator = await _unitOfWork.Collaborators.SingleOrDefaultAsync(
                    filter,
                    include: o => o.Include(i => i.CollaboratorServices)
            );

            if (collaborator == null)
            {
                return new AppResponse<string>().SetErrorResponse("user", $"Collaborator is not existed with ${dto.Id}");
            }

            _unitOfWork.CollaboratorServices.DeleteByEntities(collaborator.CollaboratorServices);
            var collaboratorServices = _mapper.Map<List<Reservation.Infrastructure.Data.Entities.CollaboratorService>>(dto.CollaboratorServices);
            await _unitOfWork.CollaboratorServices.AddRangeAsync(collaboratorServices);

            var newCollaborator = _mapper.Map<Collaborator>(dto);

            _unitOfWork.Collaborators.Update(newCollaborator);
            await _unitOfWork.CommitAsync();
            return new AppResponse<string>().SetSuccessResponse("Update Successfully!");
        }

        public async Task<AppResponse<string>> ChangeStatusAsync(Guid? collaboratorId, int status)
        {
            if( collaboratorId == null || !collaboratorId.HasValue)
            {
                return new AppResponse<string>().SetErrorResponse("id", "The Collaborator went wrong!");
            }

            var collaborator = await _unitOfWork.Collaborators
                .SingleOrDefaultAsync(item => item.Id == collaboratorId);
            
            if(collaborator == null)
            {
                return new AppResponse<string>().SetErrorResponse("id", "There is no collaborator with ID given");
            }

            collaborator.Status = status;

            await _unitOfWork.CommitAsync();

            return new AppResponse<string>().SetSuccessResponse("Approved Successfully!");

        }

        public async Task<AppResponse<CollaboratorDTO>> GetProfileByEmailAsync(string? email)
        {
            if (email == null || string.IsNullOrEmpty(email))
            {
                return new AppResponse<CollaboratorDTO>().SetSuccessResponse(new(), "id", $"{email} not found!");
            }

            Expression<Func<Collaborator, bool>> filterByEmail = c => c.Email == email;

            var collaborator = await _unitOfWork.Collaborators.SingleOrDefaultAsync(
                filterByEmail,
                include: o => o.Include(i => i.ApplicationUser)
                .Include(i => i.CollaboratorServices)
                .ThenInclude(i => i.Service)
            );

            if (collaborator == null)
            {
                return new AppResponse<CollaboratorDTO>().SetSuccessResponse(new ());
            }

            return new AppResponse<CollaboratorDTO>().SetSuccessResponse(_mapper.Map<CollaboratorDTO>(collaborator));
        }

        private async Task UpdateView(Collaborator collaborator)
        {
            var collaboratorView = await _unitOfWork.Views.SingleOrDefaultAsync(
                    filter: item => item.CollaboratorId == collaborator.Id
            );
            if (collaboratorView == null)
            {
                var view = new View()
                {
                    CollaboratorId = collaborator.Id,
                    Count = 1
                };
                await _context.Views.AddAsync(view);
            }
            else
            {
                await _context.Database.ExecuteSqlRawAsync("UPDATE Views SET COUNT = COUNT + 1 WHERE CollaboratorId = {0}", collaborator.Id);
            }

            await _context.SaveChangesAsync();
        }

        public async Task<AppResponse<PagingViewModel<List<CollaboratorDTO>>>> GetAllAsync(GetCollaboratorsRequest request)
        {
            Expression<Func<Collaborator, bool>> filterByCity = c => request.City == All || c.City == request.City;
            Expression<Func<Collaborator, bool>> filterBySex = c => request.Sex == All || c.Sex == request.Sex;
            Expression<Func<Collaborator, bool>> filterByStatus = c => request.Status == (int)CollaboratorStatus.All || request.Status == (int)CollaboratorStatus.Ready ? c.IsReady ?? false : !c.IsReady ?? false;
            
            Func<IQueryable<Collaborator>, IOrderedQueryable<Collaborator>> orderBy;
            
            switch (request.OrderType)
            {
                case (int) OrderFilterType.RateCountDecreasing:
                    orderBy = query => query.OrderByDescending(item => item.Rate);
                    break;
                case (int)OrderFilterType.RateCountIncreasing:
                    orderBy = query => query.OrderBy(item => item.Rate);
                    break;
                
                case (int)OrderFilterType.AgeDecreasing:
                    orderBy = query => query.OrderByDescending(item => item.BirthDate);
                    break;
                case (int)OrderFilterType.AgeIncreasing:
                    orderBy = query => query.OrderBy(item => item.BirthDate);
                    break;
                default:
                    orderBy = query => query.OrderByDescending(item => item.JoinedDate);
                    break;
            }
            
            var model = await _unitOfWork.Collaborators.GetAllAsync(
                    filters: [filterByCity, filterBySex, filterByStatus],
                    paging: request,
                    orderBy: orderBy,
                    include: o => o.Include(item => item.View)
                );
            var collaborators = _mapper.Map<List<CollaboratorDTO>>(model.Data);
            var result = new PagingViewModel<List<CollaboratorDTO>>(model.Total, collaborators);

            return new AppResponse<PagingViewModel<List<CollaboratorDTO>>>().SetSuccessResponse(result);
        }

    }


}

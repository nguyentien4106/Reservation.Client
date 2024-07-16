using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data;
using Reservation.Infrastructure.Data.Entities;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Collaborator;
using Reservation.Domain.Models.Enum;
using Reservation.Application.Serivces.IRepositories;

namespace Reservation.Application.Serivces.ManageCollaborator
{
    public class ManageCollaboratorService(IMapper mapper, IUnitOfWork unitOfWork) : IManageCollaboratorService
    {
        private readonly IMapper _mapper = mapper;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;

        public async Task<AppResponse<List<CollaboratorDTO>>> GetAllAsync(int type)
        {
            var collaborators = await _unitOfWork.Collaborators.GetAllAsync(orderBy:  i => i.OrderByDescending(o => o.JoinedDate));
            return new AppResponse<List<CollaboratorDTO>>().SetSuccessResponse(_mapper.Map<List<CollaboratorDTO>>(collaborators));
        }
    }
}

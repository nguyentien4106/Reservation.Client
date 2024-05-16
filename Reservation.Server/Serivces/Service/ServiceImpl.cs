using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data;
using Reservation.Server.Data.Entities;
using Reservation.Server.Models.DTO.Auth;
using Reservation.Server.Models.DTO.Service;

namespace Reservation.Server.Serivces.Service
{
    public class ServiceImpl : IService
    {
        public ServiceImpl(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public async Task<AppResponse<List<ServiceDTO>>> GetAllAsync()
        {   
            var services = await _context.Services.ToListAsync();

            return new AppResponse<List<ServiceDTO>>().SetSuccessResponse(_mapper.Map<List<ServiceDTO>>(services));
        }

        public async Task<AppResponse<bool>> AddAsync(ServiceDTO dto)
        {
            var service = _mapper.Map<Data.Entities.Service>(dto);

            await _context.Services.AddAsync(service);
            await _context.SaveChangesAsync();

            return new AppResponse<bool>().SetSuccessResponse(true);
        }
    }
}

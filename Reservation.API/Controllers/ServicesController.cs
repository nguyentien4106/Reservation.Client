using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.DTO.Service;
using Reservation.Application.Serivces.Service;

namespace Reservation.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ServicesController(IService service) : ControllerBase
    {
        private readonly IService _service = service;

        [HttpGet]
        public async Task<AppResponse<List<ServiceDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        [HttpPost]
        public async Task<AppResponse<bool>> Add(ServiceDTO dto)
        {
            return await _service.AddAsync(dto);
        }
    }
}

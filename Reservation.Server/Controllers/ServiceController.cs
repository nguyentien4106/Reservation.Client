using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Reservation.API.Models.DTO.Auth;
using Reservation.API.Models.DTO.Service;
using Reservation.API.Serivces.Service;

namespace Reservation.API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class ServiceController(IService service) : ControllerBase
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

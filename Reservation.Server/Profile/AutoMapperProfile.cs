using AutoMapper;
using Reservation.Server.Data.Entities;
using Reservation.Server.Models.DTO.Collaborator;
using Reservation.Server.Models.DTO.Service;

namespace Reservation.Server.Profile
{
    public class AutoMapperProfile : AutoMapper.Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CollaboratorService, CollaboratorServiceDTO>()
                .ForMember(item => item.Name, opt => opt.MapFrom(src => src.Service.Name));

            CreateMap<CollaboratorServiceDTO, CollaboratorService>();

            CreateMap<Collaborator, CollaboratorDTO>()
            .ForMember(dest => dest.CollaboratorServices, opt => opt.MapFrom(src => src.CollaboratorServices));

            CreateMap<Service, ServiceDTO>();

            CreateMap<ServiceDTO, Service>().ForMember(item => item.CollaboratorServices, opt => opt.Ignore());


            CreateMap<CollaboratorDTO, Collaborator>();
                

        }
    }
}

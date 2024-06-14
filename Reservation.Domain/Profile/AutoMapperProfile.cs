using Reservation.Domain.Models.DTO.Jobs;
using Reservation.Domain.Models.DTO.Collaborator;
using Reservation.Domain.Models.DTO.Customer;
using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.DTO.Service;
using Reservation.Infrastructure.Data.Entities;

namespace Reservation.Domain.Profile
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

            CreateMap<View, ViewDTO>();

            CreateMap<Order, OrderDTO>()
                .ForMember(item => item.NickName, opt => opt.MapFrom(src => src.Collaborator.NickName));

            CreateMap<OrderDTO, Order>()
                .ForMember(item => item.CollaboratorId, opt => opt.MapFrom(src => src.CollaboratorId));

            CreateMap<Review, ReviewDTO>().ReverseMap();

            CreateMap<JobDTO, Job>();

            CreateMap<Job, JobDTO>().ForMember(item => item.UserName, opt => opt.MapFrom(src => src.ApplicationUser.UserName));

            CreateMap<JobServiceDTO, JobService>().ReverseMap();

            CreateMap<Contract, ContractDTO>().ReverseMap();
        }
    }
}

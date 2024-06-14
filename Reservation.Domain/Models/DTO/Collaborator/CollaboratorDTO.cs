using Reservation.Domain.Models.DTO.Home;
using Reservation.Domain.Models.DTO.Service;
using System.ComponentModel.DataAnnotations;

namespace Reservation.Domain.Models.DTO.Collaborator
{
    public class CollaboratorDTO
    {
        public Guid? Id { get; set; }

        public string? ApplicationUserId { get; set; }

        public string? NickName { get; set; }

        public bool? IsReady { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Email { get; set; }

        public string? City { get; set; }

        public string? District { get; set; }

        public DateTime? BirthDate { get; set; }

        public int? PricePerHour { get; set; }

        public DateTime? JoinedDate { get; set; }

        public string? Introduction { get; set; }

        public string? Title { get; set; }

        public int? Status { get; set; }

        public List<CollaboratorServiceDTO>? CollaboratorServices { get; set; }

        public int? Weight { get; set; }

        public int? Height { get; set; }

        public string? Job { get; set; }

        public string? Sex { get; set; }

        public string? OtherServices { get; set; }

        public ViewDTO? View { get; set; }

        public List<OrderDTO>? Orders { get; set; }

        public double? AvgRate => Orders?.Average(order => order.Review?.Rate);
    }
}

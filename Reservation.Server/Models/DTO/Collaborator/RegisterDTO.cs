namespace Reservation.Server.Models.DTO.UserServicesRegister
{
    public class RegisterDTO
    {
        public string? ApplicationUserId { get; set; }

        public string? Email { get; set; }

        public string? Status { get; set; }

        public string? UserName { get; set; }

        public string? NickName { get; set; }

        public bool? IsReady { get; set; }

        public string? PhoneNumber { get; set; }

        public string? City { get; set; }

        public string? District { get; set; }

        public DateTime? BirthDate { get; set; }

        public int? PricePerHour { get; set; }

        public DateTime? JoinedDate { get; set; }

        public List<Guid> Services { get; set; } = new();

        public int? Height { get; set; }

        public int? Weight { get; set; }


    }
}

namespace Reservation.Domain.Models.DTO.Auth.Request
{
    public class UserRegisterRequest
    {
        public string Email { get; set; } = "";

        public string Password { get; set; } = "";

        public string PhoneNumber { get; set; } = "";

        public string Name { get; set; } = string.Empty;
    }
}

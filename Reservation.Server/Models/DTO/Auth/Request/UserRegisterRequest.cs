namespace Reservation.API.Models.DTO.Auth.Request
{
    public class UserRegisterRequest
    {
        public string Email { get; set; } = "";

        public string Password { get; set; } = "";

        public string PhoneNumber { get; set; } = "";
    }
}

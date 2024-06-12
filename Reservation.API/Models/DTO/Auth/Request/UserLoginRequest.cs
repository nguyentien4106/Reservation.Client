namespace Reservation.API.Models.DTO.Auth.Request
{
    public class UserLoginRequest
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
}

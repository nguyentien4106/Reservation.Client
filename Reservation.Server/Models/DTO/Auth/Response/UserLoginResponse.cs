namespace Reservation.API.Models.DTO.Auth.Response
{
    public class UserLoginResponse
    {
        public string AccessToken { get; set; } = "";
        public string RefreshToken { get; set; } = "";
    }
}

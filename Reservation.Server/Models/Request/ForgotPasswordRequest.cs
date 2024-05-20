using System.ComponentModel.DataAnnotations;

namespace Reservation.Server.Models.Request
{
    public class ForgotPasswordRequest
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}

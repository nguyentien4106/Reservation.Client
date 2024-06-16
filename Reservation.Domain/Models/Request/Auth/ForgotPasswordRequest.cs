using System.ComponentModel.DataAnnotations;

namespace Reservation.Domain.Models.Request.Auth
{
    public class ForgotPasswordRequest
    {
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}

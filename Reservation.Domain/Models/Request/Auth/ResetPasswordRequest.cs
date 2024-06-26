﻿namespace Reservation.Domain.Models.Request.Auth
{
    public class ResetPasswordRequest
    {
        public string Email { get; set; } = string.Empty;

        public string? Token { get; set; }

        public string? Password { get; set; }
    }
}

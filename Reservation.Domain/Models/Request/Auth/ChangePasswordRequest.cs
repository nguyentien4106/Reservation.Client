﻿namespace Reservation.Domain.Models.Request.Auth
{
    public class ChangePasswordRequest
    {
        public string UserId { get; set; } = string.Empty;

        public string CurrentPassword { get; set; } = string.Empty;

        public string NewPassword { get; set; } = string.Empty;
    }
}

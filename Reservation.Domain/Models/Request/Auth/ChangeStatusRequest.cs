﻿namespace Reservation.Domain.Models.Request.Auth
{
    public class ChangeStatusRequest
    {
        public Guid? CollaboratorId { get; set; }

        public int Status { get; set; }
    }
}

﻿
namespace Reservation.Domain.Models.DTO.Customer
{
    public class ReviewDTO
    {
        public Guid? OrderId { get; set; }

        public string? ApplicationUserId { get; set; }

        public int Rate { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateTime? CreateAt { get; set; } = DateTime.Now;

        public bool Recommend { get; set; }

    }
}

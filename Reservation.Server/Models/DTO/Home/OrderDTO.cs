namespace Reservation.Server.Models.DTO.Home
{
    public class OrderDTO
    {
        public Guid Id { get; set; }

        public Guid CollaboratorId { get; set; }

        public string? NickName { get; set; }

        public string ApplicationUserId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public int? Offer { get; set; }

        public int? Times { get; set; }

        public string? Description { get; set; }

        public string? Zalo { get; set; }

        public string? CollaboratorEmail { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? ConfirmedDate { get; set; }

        public int? Status { get; set; }

    }
}

namespace Reservation.Server.Models.DTO.Email
{
    public class EmailContent
    {
        public string ToEmail { get; set; } = string.Empty;

        public string ToName { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;
    }
}

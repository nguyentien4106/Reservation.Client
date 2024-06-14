using MimeKit;

namespace Reservation.Domain.Models.DTO.Email
{
    public class EmailContent(MimeEntity body)
    {
        public EmailContent() : this(null)
        {
        }

        public MimeEntity Body { get; set; } = body;

        public string ToEmail { get; set; } = string.Empty;

        public string ToName { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

    }
}

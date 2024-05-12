using MailKit.Net.Smtp;
using MimeKit;
using Reservation.Server.Models.DTO.Email;

namespace Reservation.Server.Serivces.Email
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        private readonly string _fromEmail;
        private readonly string _fromName;
        private readonly string _key;
        private readonly string _server;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _fromEmail = _configuration.GetValue<string>("EmailService:Email") ?? "";
            _fromName = _configuration.GetValue<string>("EmailService:Name") ?? "";
            _key = _configuration.GetValue<string>("EmailService:Key") ?? "";
            _server = _configuration.GetValue<string>("EmailService:Server") ?? "";
        }

        public bool SendMail(EmailContent email)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_fromName, _fromEmail));
                message.To.Add(new MailboxAddress(email.ToName, email.ToEmail));
                message.Subject = email.Subject;
                message.Body = new TextPart("plain")
                {
                    Text = email.Content
                };

                using var client = new SmtpClient();
                client.Connect(_server, 587, false);

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate(_fromEmail, _key);

                client.Send(message);
                client.Disconnect(true);

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}

using MimeKit;
using Reservation.Domain.Models.DTO.Email;
using Reservation.Domain.Models.DTO.Home;

namespace Reservation.Application.Serivces.Email
{
    public interface IEmailService
    {
        bool SendMail(EmailContent email);

        string GetTemplateFilePath(string templateFilePath);

        string GetEmailTemplate(string template);

        bool Sent(MimeMessage message);
    }
}

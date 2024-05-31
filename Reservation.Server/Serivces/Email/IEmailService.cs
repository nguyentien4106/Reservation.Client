using MimeKit;
using Reservation.Server.Models.DTO.Email;
using Reservation.Server.Models.DTO.Home;

namespace Reservation.Server.Serivces.Email
{
    public interface IEmailService
    {
        bool SendMail(EmailContent email);

        bool SendEmailNewOrder(EmailContent email, OrderDTO order);

        string GetTemplateFilePath(string templateFilePath);

        string GetEmailTemplate(string template);
    }
}

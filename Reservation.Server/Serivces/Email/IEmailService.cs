using MimeKit;
using Reservation.API.Models.DTO.Email;
using Reservation.API.Models.DTO.Home;

namespace Reservation.API.Serivces.Email
{
    public interface IEmailService
    {
        bool SendMail(EmailContent email);

        bool SendEmailNewOrder(EmailContent email, OrderDTO order);

        string GetTemplateFilePath(string templateFilePath);

        string GetEmailTemplate(string template);
    }
}

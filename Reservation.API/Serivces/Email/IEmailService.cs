using MimeKit;
using Reservation.Domain.Models.DTO.Email;
using Reservation.Domain.Models.DTO.Home;

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

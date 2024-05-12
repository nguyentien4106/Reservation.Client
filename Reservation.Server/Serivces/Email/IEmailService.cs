using Reservation.Server.Models.DTO.Email;

namespace Reservation.Server.Serivces.Email
{
    public interface IEmailService
    {
        bool SendMail(EmailContent email);
    }
}

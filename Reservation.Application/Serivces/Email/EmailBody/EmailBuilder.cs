using MimeKit;
namespace Reservation.Application.Serivces.Email.EmailBody
{
    public class EmailBuilder
    {
        private readonly MimeMessage _message = new();

        public EmailBuilder SetSender(string senderName, string senderEmail)
        {
            _message.Sender = new MailboxAddress(senderName, senderEmail);
            return this;
        }

        public EmailBuilder SetFrom(string fromName, string fromEmail)
        {
            _message.From.Add(new MailboxAddress(fromName, fromEmail));

            return this;
        }

        public EmailBuilder SetTo(string toName, string toEmail)
        {
            _message.To.Add(new MailboxAddress(toName, toEmail));

            return this;
        }

        public EmailBuilder SetSubject(string subject)
        {
            _message.Subject = subject;
            return this;
        }

        public EmailBuilder SetBody(string body)
        {
            _message.Body = new TextPart(body);
            return this;
        }

        public EmailBuilder SetBody(BodyBuilder body)
        {
            _message.Body = body.ToMessageBody();
            return this;
        }

        //public EmailBuilder AddCC(string cc)
        //{
        //    _message.CC.Add(cc);
        //    return this;
        //}

        //public EmailBuilder AddBCC(string bcc)
        //{
        //    _message.BCC.Add(bcc);
        //    return this;
        //}

        //public EmailBuilder AddAttachment(string attachment)
        //{
        //    _message.Attachments.Add(attachment);
        //    return this;
        //}

        public MimeMessage Build()
        {
            return _message;
        }
    }
}

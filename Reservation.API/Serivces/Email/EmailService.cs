using HtmlAgilityPack;
using MailKit.Net.Smtp;
using MimeKit;
using Reservation.Domain.Models.DTO.Email;
using Reservation.Domain.Models.DTO.Home;
using System.Text;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace Reservation.API.Serivces.Email
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly string _fromEmail;
        private readonly string _fromName;
        private readonly string _key;
        private readonly string _server;

        public EmailService(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            _configuration = configuration;
            _fromEmail = _configuration.GetValue<string>("EmailService:Email") ?? "";
            _fromName = _configuration.GetValue<string>("EmailService:Name") ?? "";
            _key = _configuration.GetValue<string>("EmailService:Key") ?? "";
            _server = _configuration.GetValue<string>("EmailService:Server") ?? "";
            _hostingEnvironment = hostingEnvironment;
        }

        public bool SendEmailNewOrder(EmailContent email, OrderDTO order)
        {
            var filePath = GetTemplateFilePath("newOrder.html");
            var doc = new HtmlDocument();
            doc.Load(filePath);
            var node = doc.DocumentNode.SelectSingleNode("//body");

            var body = new BodyBuilder();
            body.HtmlBody = GetEmailContent(node.OuterHtml, order, email);

            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_fromName, _fromEmail));
                message.To.Add(new MailboxAddress(email.ToName, email.ToEmail));
                message.Subject = email.Subject;
                message.Body = body.ToMessageBody();

                return Sent(message);
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public bool SendMail(EmailContent email)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_fromName, _fromEmail));
                message.To.Add(new MailboxAddress(email.ToName, email.ToEmail));
                message.Subject = email.Subject;
                message.Body = email.Body ?? new TextPart("plain")
                {
                    Text = email.Content
                };

                return Sent(message);
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        private bool Sent(MimeMessage message)
        {
            using var client = new SmtpClient();
            client.Connect(_server, 587, false);

            // Note: only needed if the SMTP server requires authentication
            client.Authenticate(_fromEmail, _key);

            client.Send(message);
            client.Disconnect(true);

            return true;
        }

        private string GetEmailContent(string template, OrderDTO order, EmailContent email)
        {
            var builder = new StringBuilder(template);
            builder.Replace("[COLLABORATOR_NAME]", email.ToName);
            builder.Replace("[CUSTOMER_NAME]", order.Name);
            builder.Replace("[PRICE]", order.Tips.ToString());
            builder.Replace("[TIMES]", order.Times.ToString());
            builder.Replace("[AMOUNT]", $"{order.Amount}");
            builder.Replace("[DESCRIPTION]", order.Description);
            builder.Replace("[EMAIL]", order.Email);
            builder.Replace("[PHONE]", order.PhoneNumber);
            builder.Replace("[ZALO]", order.Zalo);
            builder.Replace("[CREATED_DATE]", order.CreatedDate.ToString());

            return builder.ToString();
        }

        public string GetTemplateFilePath(string template)
        {
            var url = _hostingEnvironment.ContentRootPath;
            var filePath = Path.Combine(url, $"Template/{template}");

            return filePath;
        }

        public string GetEmailTemplate(string template)
        {
            var filePath = GetTemplateFilePath(template);
            var doc = new HtmlDocument();
            doc.Load(filePath);
            var node = doc.DocumentNode.SelectSingleNode("//body");

            return node.OuterHtml;
        }
    }
}

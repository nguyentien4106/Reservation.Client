﻿using HtmlAgilityPack;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using Reservation.Application.Serivces.Email;
using Reservation.Domain.Models.DTO.Email;
using Reservation.Domain.Models.DTO.Home;
using System.Text;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace Reservation.Application.Serivces.Email
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ILogger<EmailService> _logger;

        private readonly string _fromEmail;
        private readonly string _fromName;
        private readonly string _key;
        private readonly string _server;

        public EmailService(IConfiguration configuration, IHostingEnvironment hostingEnvironment, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _fromEmail = _configuration.GetValue<string>("EmailService:Email") ?? "";
            _fromName = _configuration.GetValue<string>("EmailService:Name") ?? "";
            _key = _configuration.GetValue<string>("EmailService:Key") ?? "";
            _server = _configuration.GetValue<string>("EmailService:Server") ?? "";
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
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
                _logger.LogInformation($"Sent email to {email.ToEmail}");

                return Sent(message);
            }
            catch(Exception ex)
            {
                _logger.LogError($"Sent email error, {ex.Message}");
                return false;
            }
        }

        public bool Sent(MimeMessage message)
        {
            message.Sender = new MailboxAddress(_fromName, _fromEmail);
            
            using var client = new SmtpClient();
            client.Connect(_server, 587, false);

            // Note: only needed if the SMTP server requires authentication
            client.Authenticate(_fromEmail, _key);

            client.Send(message);
            client.Disconnect(true);

            return true;
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

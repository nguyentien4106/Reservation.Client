using HtmlAgilityPack;
using Microsoft.AspNetCore.Hosting;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reservation.Application.Serivces.Email.EmailBody
{
    public abstract class EmailBodyBuilderBase
    {
        private readonly string _filePath = "";
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly HtmlDocument _doc = new();
        private readonly BodyBuilder _bodyBuilder = new BodyBuilder();
        protected string _html = "";

        protected EmailBodyBuilderBase() : this(null, "")
        {
        }

        protected EmailBodyBuilderBase(IHostingEnvironment hostingEnvironment, string template)
        {
            _hostingEnvironment = hostingEnvironment;
            _filePath = GetTemplateFilePath(template);
            _doc = new();
        }

        public BodyBuilder GetBodyBuilder()
        {
            Load();
            Write();

            _bodyBuilder.HtmlBody = _html;
            return _bodyBuilder;
        }

        private void Load()
        {
            _doc.Load(_filePath);
            _html = _doc.DocumentNode.SelectSingleNode("//body").OuterHtml;
        }

        protected abstract void Write();

        protected virtual string GetTemplateFilePath(string template)
        {
            if (_hostingEnvironment == null)
            {
                throw new InvalidOperationException("Invalid Operation: WebhostEnviroment null");
            }

            if (string.IsNullOrEmpty(template))
            {
                throw new InvalidOperationException("Template file is empty");
            }

            var url = _hostingEnvironment.ContentRootPath;
            var filePath = Path.Combine(url, $"Template/{template}");

            return filePath;
        }
    }
}

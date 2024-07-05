using Microsoft.AspNetCore.Hosting;
using Reservation.Domain.Models.DTO.Email;
using Reservation.Domain.Models.DTO.Home;
using System.Text;

namespace Reservation.Application.Serivces.Email.EmailBody
{
    public class NewOrderEmailBodyBuiler
        (
            IHostingEnvironment hostingEnvironment,
            OrderDTO order,
            string name
        )
        : EmailBodyBuilderBase(hostingEnvironment, "newOrder.html")
    {
        private readonly OrderDTO _order = order;
        private readonly string _collboratorName = name;

        protected override void Write()
        {
            var builder = new StringBuilder(_html);
            builder.Replace("[COLLABORATOR_NAME]", _collboratorName);
            builder.Replace("[CUSTOMER_NAME]", _order.Name);
            builder.Replace("[PRICE]", _order.Tips.ToString());
            builder.Replace("[TIMES]", _order.Times.ToString());
            builder.Replace("[AMOUNT]", $"{_order.Amount}");
            builder.Replace("[DESCRIPTION]", _order.Description);
            builder.Replace("[EMAIL]", _order.Email);
            builder.Replace("[PHONE]", _order.PhoneNumber);
            builder.Replace("[ZALO]", _order.Zalo);
            builder.Replace("[CREATED_DATE]", _order.CreateAt.ToString());

            _html = builder.ToString();
        }
    }
}
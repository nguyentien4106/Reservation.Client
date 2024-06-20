using Microsoft.AspNetCore.Hosting;
using Reservation.Domain.Models.DTO.Auth;
using Reservation.Domain.Models.Enum;
using System.Text;
using OrderEnity = Reservation.Infrastructure.Data.Entities.Order;
namespace Reservation.Application.Serivces.Email.EmailBody
{
    public class OrderConfirmationEmailBodyBuilder : EmailBodyBuilderBase
    {
        private readonly OrderEnity _order;
        private readonly TokenSettings _tokenSettings;
        public OrderConfirmationEmailBodyBuilder(
            IHostingEnvironment hostingEnvironment,
            TokenSettings tokenSettings,
            OrderEnity order
        ) 
            : base(hostingEnvironment, "orderConfirmation.html")
        {
            _order = order;
            _tokenSettings = tokenSettings;
        }

        protected override void Write()
        {
            var builder = new StringBuilder(_html);
            builder.Replace("[CUSTOMER_NAME]", _order.ApplicationUser.FirstName + " " + _order.ApplicationUser.LastName);
            builder.Replace("[CREATED_DATE]", _order.CreatedDate.ToString());
            builder.Replace("[COLLABORATOR_NAME]", _order.Collaborator.NickName);
            builder.Replace("[LINK_TALENT]", $"{_tokenSettings.Audience}/collaborators/{_order.Collaborator.Id}");
            builder.Replace("[AMOUNT]", $"{_order.Amount}");
            if(_order.Status == (int)OrderStatus.Approved)
            {
                builder.Replace("[STATUS_NAME]", "ĐƯỢC CHẤP THUẬN");
                builder.Replace("[EMAIL]", _order.Collaborator.Email);
                builder.Replace("[PHONE]", _order.Collaborator.PhoneNumber);
            }
            else
            {
                builder.Replace("[STATUS_NAME]", "ĐƯỢC TỪ CHỐI");
                builder.Replace("[EMAIL]", "");
                builder.Replace("[PHONE]", "");
            }


            _html = builder.ToString();
        }
    }
}

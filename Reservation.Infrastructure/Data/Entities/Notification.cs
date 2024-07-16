using System.ComponentModel.DataAnnotations;

namespace Reservation.Infrastructure.Data.Entities
{
    public class Notification : BaseEntity
    {
        public Notification() : this(new Guid(), 0, string.Empty)
        {
            
        }
        public Notification(Guid userId, short type, string content)
        {
            Type = type;
            Content = content;
            ApplicationUserId = userId;
        }

        public Notification(string userId, short type, string content)
        {
            Type = type;
            Content = content;
            ApplicationUserId = new Guid(userId);
        }

        [Required]
        public Guid ApplicationUserId { get; set; }

        public ApplicationUser? ApplicationUser { get; set; }

        public short Type { get; set; }

        public string Content { get; set; }

        public bool Read { get; set; }

    }
}

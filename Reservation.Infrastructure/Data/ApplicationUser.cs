using Microsoft.AspNetCore.Identity;
using Reservation.Infrastructure.Data.Entities;

namespace Reservation.Infrastructure.Data
{
    public class ApplicationUser : IdentityUser
    {
        public DateTimeOffset JoinedDate { get; set; }
    
        public Collaborator? CollaboratorProfile { get; set; }

        public List<Order> Orders { get; set; } = [];

        public List<JobService> JobServices { get; set; } = [];
    }
}

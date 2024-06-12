using Microsoft.AspNetCore.Identity;
using Reservation.API.Data.Entities;

namespace Reservation.API.Data
{
    public class ApplicationUser : IdentityUser
    {
        public DateTimeOffset JoinedDate { get; set; }
    
        public Collaborator? CollaboratorProfile { get; set; }

        public List<Order> HireRequests { get; set; } = [];

        public List<JobService> JobServices { get; set; } = [];
    }
}

using Microsoft.AspNetCore.Identity;
using Reservation.Server.Data.Entities;

namespace Reservation.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public DateTimeOffset JoinedDate { get; set; }
    
        public Collaborator? CollaboratorProfile { get; set; }
    }
}

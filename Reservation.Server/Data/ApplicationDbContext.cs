using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data.Entities;
using System.Reflection.Emit;

namespace Reservation.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<Collaborator> Collaborators { get; set; }

        public DbSet<Service> Services { get; set; }

        public DbSet<CollaboratorService> CollaboratorServices { get; set; }

        public DbSet<View> Views { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<Rate> Rates { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .HasOne(e => e.CollaboratorProfile)
                .WithOne(e => e.ApplicationUser)
                .HasForeignKey<Collaborator>(e => e.ApplicationUserId)
            .IsRequired(false);

            builder.Entity<CollaboratorService>()
                .HasKey(cs => new { cs.CollaboratorId, cs.ServiceId });

            builder.Entity<CollaboratorService>()
                .HasOne(cs => cs.Collaborator)
                .WithMany(c => c.CollaboratorServices)
                .HasForeignKey(cs => cs.CollaboratorId);

            builder.Entity<CollaboratorService>()
                .HasOne(cs => cs.Service)
                .WithMany(s => s.CollaboratorServices)
                .HasForeignKey(cs => cs.ServiceId);

            builder.Entity<Order>()
                .HasKey(hr => hr.Id);

            builder.Entity<Order>()
                .HasOne(hr => hr.Collaborator)
                .WithMany(c => c.Orders)
                .HasForeignKey(k => k.CollaboratorId);

            builder.Entity<Order>()
                .HasOne(hr => hr.ApplicationUser)
                .WithMany(k => k.HireRequests)
                .HasForeignKey(c => c.ApplicationUserId);
        }

    }
}

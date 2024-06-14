using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Reservation.Infrastructure.Data.Entities;

namespace Reservation.Infrastructure.Data
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

        public DbSet<Job> Jobs { get; set; }

        public DbSet<Contract> Contracts { get; set; }

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


            builder.Entity<JobService>()
                .HasKey(cs => new { cs.JobId, cs.ServiceId });

            builder.Entity<JobService>()
                .HasOne(cs => cs.Job)
                .WithMany(c => c.JobServices)
                .HasForeignKey(cs => cs.JobId);

            builder.Entity<JobService>()
                .HasOne(cs => cs.Service)
                .WithMany(s => s.JobServices)
                .HasForeignKey(cs => cs.ServiceId);

            builder.Entity<Order>()
                .HasKey(hr => hr.Id);

            builder.Entity<Order>()
                .HasOne(hr => hr.Collaborator)
                .WithMany(c => c.Orders)
                .HasForeignKey(k => k.CollaboratorId);

            builder.Entity<Order>()
                .HasOne(hr => hr.ApplicationUser)
                .WithMany(k => k.Orders)
                .HasForeignKey(c => c.ApplicationUserId);

            builder.Entity<CollaboratorService>().Property(e => e.Price).HasPrecision(18, 2);
            builder.Entity<Order>().Property(e => e.Price).HasPrecision(18, 2);
            builder.Entity<Order>().Property(e => e.Amount).HasPrecision(18, 2);
            builder.Entity<Job>().Property(e => e.Cast).HasPrecision(18, 2);

            builder.Entity<Contract>()
                .HasOne(cs => cs.Job)
                .WithMany(c => c.Contracts)
                .HasForeignKey(cs => cs.JobId);

            builder.Entity<Contract>()
                .HasOne(cs => cs.LesseeUser)
                .WithMany(s => s.Contracts)
                .HasForeignKey(cs => cs.LesseeId);
        }

    }
}

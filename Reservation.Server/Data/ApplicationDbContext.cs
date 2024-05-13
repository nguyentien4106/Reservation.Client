using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Reservation.Server.Data.Entities;

namespace Reservation.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<CollaboratorProfile> CollaboratorProfiles { get; set; }

        public DbSet<Service> Services { get; set; }

        public DbSet<CollaboratorServiceEntity> CollaboratorServiceEntities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>()
                .HasOne(e => e.CollaboratorProfile)
                .WithOne(e => e.ApplicationUser)
                .HasForeignKey<CollaboratorProfile>(e => e.ApplicationUserId)
                .IsRequired(false);

            builder.Entity<CollaboratorProfile>()
                .HasMany(e => e.Services)
                .WithMany(e => e.CollaboratorProfiles)
                .UsingEntity<CollaboratorServiceEntity>();
        }

    }
}

using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<ContactModel> Contacts { get; set; }
        public DbSet<OrganisationModel> Organisations { get; set; }
        public DbSet<ConnectionModel> Connections { get; set; }
        public DbSet<InteractionModel> Interactions { get; set; }

        public override int SaveChanges()
        {
            try
            {
                UpdateTimestamps();
                return base.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries<BaseModel>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.SetCreatedTime();
                }

                entry.Entity.SetUpdatedTime();
            }
        }
    }
}


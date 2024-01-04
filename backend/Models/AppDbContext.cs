using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        // Add other DbSets for other entities
    }
}


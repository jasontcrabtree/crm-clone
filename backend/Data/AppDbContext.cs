using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Text.Json;
using backend.Models;
using System.Security.Claims;

public class AppDbContext : DbContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AppDbContext(DbContextOptions<AppDbContext> options, IHttpContextAccessor httpContextAccessor)
        : base(options)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public DbSet<UserModel> Users { get; set; }
    public DbSet<ContactModel> Contacts { get; set; }
    public DbSet<OrganisationModel> Organisations { get; set; }
    public DbSet<ConnectionModel> Connections { get; set; }
    public DbSet<InteractionModel> Interactions { get; set; }

    public override int SaveChanges()
    {
        UpdateTimestampsAndRecordInteractions();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestampsAndRecordInteractions();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestampsAndRecordInteractions()
    {
        var currentUserId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var now = DateTime.UtcNow;

        var entries = ChangeTracker.Entries().Where(e => e.Entity is BaseModel && (e.State == EntityState.Added || e.State == EntityState.Modified));

        foreach (var entry in entries)
        {
            var baseModel = (BaseModel)entry.Entity;
            var timeNow = DateTime.UtcNow;

            // Update timestamps
            if (entry.State == EntityState.Added)
            {
                baseModel.SetCreatedTime();
            }
            baseModel.SetUpdatedTime();

            // Create Interaction record
            var interaction = new InteractionModel
            {
                InteractionDate = DateOnly.FromDateTime(now),
                InteractionTitle = $"{entry.Entity.GetType().Name} {(entry.State == EntityState.Added ? "Created" : "Updated")}",
                InteractionType = InteractionType.Other,
                UserId = baseModel.Id,
                EntityType = entry.Entity.GetType().Name,
                EntityId = baseModel.Id,
                DetailedData = JsonSerializer.Serialize(new { OriginalValues = entry.OriginalValues.ToObject(), CurrentValues = entry.CurrentValues.ToObject() })
            };

            Interactions.Add(interaction);
        }
    }
}
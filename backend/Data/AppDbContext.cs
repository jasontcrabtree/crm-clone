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
        var now = DateTime.UtcNow;
        var interactionsToAdd = new List<InteractionModel>(); // Collect interactions here first

        // Fetch the current user ID
        var currentUserIdString = _httpContextAccessor.HttpContext?.User.FindFirstValue("userId");
        if (!int.TryParse(currentUserIdString, out int currentUserId))
        {
            currentUserId = 0;
        }

        foreach (var entry in ChangeTracker.Entries().Where(e => e.Entity is BaseModel && (e.State == EntityState.Added || e.State == EntityState.Modified)))
        {
            var baseModel = (BaseModel)entry.Entity;

            // Prepare the interaction without adding it directly to the DbContext
            var interaction = new InteractionModel
            {
                InteractionDate = DateOnly.FromDateTime(now),
                InteractionTitle = $"{entry.Entity.GetType().Name} {(entry.State == EntityState.Added ? "Created" : "Updated")}",
                InteractionType = InteractionType.Other, // Determine this dynamically as needed
                UserId = currentUserId,
                EntityType = entry.Entity.GetType().Name,
                EntityId = baseModel.Id,
                DetailedData = JsonSerializer.Serialize(new { OriginalValues = entry.OriginalValues.ToObject(), CurrentValues = entry.CurrentValues.ToObject() })
            };

            interactionsToAdd.Add(interaction);
        }

        // Now that we've finished iterating over the ChangeTracker entries, add the prepared interactions
        foreach (var interaction in interactionsToAdd)
        {
            Interactions.Add(interaction);
        }
    }
}
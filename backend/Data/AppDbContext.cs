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
        var nowUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds(); // Current Unix timestamp
        var nowDateTime = DateTime.UtcNow; // For InteractionDate
        var interactionsToAdd = new List<InteractionModel>(); // Collect interactions here first

        // Fetch the current user ID, default to 0 if not found
        var currentUserIdString = _httpContextAccessor.HttpContext?.User.FindFirstValue("userId");
        int.TryParse(currentUserIdString, out int currentUserId);

        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is BaseModel baseModel)
            {
                // Update timestamps
                if (entry.State == EntityState.Added)
                {
                    baseModel.CreatedTimeUnix = nowUnix;
                }
                baseModel.UpdatedTimeUnix = nowUnix;

                // Skip logging for InteractionModel changes to avoid recursion
                // Skip logging for InteractionModel and UserModel changes
                if (entry.Entity is InteractionModel || entry.Entity is UserModel) continue;

                // Serialize changes for interaction logging
                var originalValuesDictionary = entry.State == EntityState.Added
                ? new Dictionary<string, object?>() : entry.OriginalValues.Properties.ToDictionary(property => property.Name, property => entry.OriginalValues[property.Name]);

                var currentValuesDictionary = entry.CurrentValues.Properties.ToDictionary(property => property.Name, property => entry.CurrentValues[property.Name]);

                // Prepare the interaction
                var interaction = new InteractionModel
                {
                    InteractionDate = DateOnly.FromDateTime(nowDateTime),
                    InteractionTitle = $"{entry.Entity.GetType().Name} {(entry.State == EntityState.Added ? "Created" : "Updated")}",
                    InteractionType = InteractionType.Other, // Adjust based on your logic
                    UserId = currentUserId,
                    EntityType = entry.Entity.GetType().Name,
                    EntityId = baseModel.Id,
                    DetailedData = JsonSerializer.Serialize(new
                    {
                        OriginalValues = originalValuesDictionary,
                        CurrentValues = currentValuesDictionary
                    })
                };

                interactionsToAdd.Add(interaction);
            }
        }

        // Add the prepared interactions to the context
        foreach (var interaction in interactionsToAdd)
        {
            Interactions.Add(interaction);
        }
    }
}
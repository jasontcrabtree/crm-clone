using backend.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

public class InteractionLoggingService
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public InteractionLoggingService(AppDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task LogInteractionAsync(string entityType, int entityId, InteractionType interactionType, string title, object details, string? customInteractionType = null)
    {
        var currentUserIdString = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!int.TryParse(currentUserIdString, out int currentUserId))
        {
            currentUserId = 0;
        }

        var interaction = new InteractionModel
        {
            InteractionDate = DateOnly.FromDateTime(DateTime.UtcNow),
            InteractionTitle = title,
            EntityType = entityType,
            EntityId = entityId,
            UserId = currentUserId,
            InteractionType = interactionType,
            CustomInteractionType = customInteractionType,
            InteractionNotes = JsonSerializer.Serialize(details),
            DetailedData = JsonSerializer.Serialize(details),
        };

        _context.Interactions.Add(interaction);
        await _context.SaveChangesAsync();
    }
}

using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

public abstract class BaseController : ControllerBase
{
    private InteractionLoggingService? _interactionLoggingService;

    protected InteractionLoggingService InteractionLoggingService =>
    _interactionLoggingService ??= (HttpContext.RequestServices.GetService(typeof(InteractionLoggingService)) as InteractionLoggingService)
    ?? throw new InvalidOperationException("InteractionLoggingService is not registered.");


    protected int GetUserId()
    {
        if (User.Identity is ClaimsIdentity identity)
        {
            var userIdClaim = identity.FindFirst("UserId");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }
        }

        // throw new InvalidOperationException("User ID not found.");
        return 0;
    }

    protected async Task LogInteractionAsync(string entityType, int entityId, InteractionType interactionType, string title, object details, string? customInteractionType = null)
    {
        await InteractionLoggingService.LogInteractionAsync(entityType, entityId, interactionType, title, details, customInteractionType);
    }
}

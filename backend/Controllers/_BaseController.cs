using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.Extensions.Logging;

public abstract class BaseController : ControllerBase
{
    private readonly InteractionLoggingService _interactionLoggingService;
    private readonly ILogger _logger;

    public BaseController(InteractionLoggingService interactionLoggingService, ILogger<BaseController> logger)
    {
        _interactionLoggingService = interactionLoggingService ?? throw new ArgumentNullException(nameof(interactionLoggingService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    protected InteractionLoggingService InteractionLoggingService => _interactionLoggingService;

    protected int GetUserId()
    {
        try
        {
            return User.GetUserId();  // Utilize the extension method
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve user ID");
            throw new InvalidOperationException("User ID not found or invalid.", ex);
        }
    }

    protected async Task LogInteractionAsync(string entityType, int entityId, InteractionType interactionType, string title, object details, string? customInteractionType = null)
    {
        await InteractionLoggingService.LogInteractionAsync(entityType, entityId, interactionType, title, details, customInteractionType);
    }
}
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.Extensions.Logging;
public abstract class BaseController : ControllerBase
{
    private readonly InteractionLoggingService _interactionLoggingService;
    private readonly ILogger<BaseController> _logger;

    public BaseController(InteractionLoggingService interactionLoggingService, ILogger<BaseController> logger)
    {
        _interactionLoggingService = interactionLoggingService ?? throw new ArgumentNullException(nameof(interactionLoggingService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    protected InteractionLoggingService InteractionLoggingService => _interactionLoggingService;

    protected int GetUserId()
    {
        var userId = User.GetUserId(_logger);
        if (!userId.HasValue)
        {
            _logger.LogError("User ID claim not present or is invalid.");
            throw new InvalidOperationException("User ID claim not present or is invalid.");
        }
        else
        {
            _logger.LogInformation($"Retrieved User ID: {userId.Value}");
        }

        return userId.Value;
    }

    protected async Task LogInteractionAsync(string entityType, int entityId, InteractionType interactionType, string title, object details, string? customInteractionType = null)
    {
        await InteractionLoggingService.LogInteractionAsync(entityType, entityId, interactionType, title, details, customInteractionType);
    }
}
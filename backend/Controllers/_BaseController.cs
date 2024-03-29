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

    public static int? GetUserId(this ClaimsPrincipal user, ILogger logger)
    {
        logger.LogInformation($"Claims available: {string.Join(", ", user.Claims.Select(c => $"{c.Type}: {c.Value}"))}");

        if (user.Identity is ClaimsIdentity identity)
        {
            var userIdClaim = identity.FindFirst("userId");
            if (userIdClaim != null)
            {
                if (int.TryParse(userIdClaim.Value, out int userId))
                {
                    return userId;
                }
                else
                {
                    logger.LogError($"User ID claim is not a valid integer: {userIdClaim.Value}");
                }
            }
            else
            {
                logger.LogError("User ID claim not found in the user claims.");
            }
        }
        else
        {
            logger.LogError("User identity is not a ClaimsIdentity or is missing.");
        }

        return null;
    }

    protected async Task LogInteractionAsync(string entityType, int entityId, InteractionType interactionType, string title, object details, string? customInteractionType = null)
    {
        await InteractionLoggingService.LogInteractionAsync(entityType, entityId, interactionType, title, details, customInteractionType);
    }
}
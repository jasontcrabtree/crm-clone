using System.Security.Claims;
using Microsoft.Extensions.Logging;

public static class UserIdentityExtensions
{
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

    public static IDictionary<string, string> GetAllClaims(this ClaimsPrincipal user, ILogger logger)
    {
        if (user.Identity is ClaimsIdentity)
        {
            logger.LogInformation($"Fetching all claims for the user.");
            return user.Claims.ToDictionary(c => c.Type, c => c.Value);
        }
        else
        {
            logger.LogError("User identity is not a ClaimsIdentity or is missing.");
            return new Dictionary<string, string>();  // Return an empty dictionary to indicate no claims are found
        }
    }
}
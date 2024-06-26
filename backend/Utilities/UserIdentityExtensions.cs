// using System.Security.Claims;

// public static class UserIdentityExtensions
// {
//     public static int? GetUserId(this ClaimsPrincipal user, ILogger logger)
//     {
//         if (user.Identity is ClaimsIdentity identity)
//         {
//             var userIdClaim = identity.FindFirst("userId");
//             if (userIdClaim != null)
//             {
//                 if (int.TryParse(userIdClaim.Value, out int userId))
//                 {
//                     return userId;
//                 }
//                 else
//                 {
//                     logger.LogError($"User ID claim is not a valid integer: {userIdClaim.Value}");
//                 }
//             }
//             else
//             {
//                 logger.LogError("User ID claim not found in the user claims.");
//             }
//         }
//         else
//         {
//             logger.LogError("User identity is not a ClaimsIdentity or is missing.");
//         }

//         return null;
//     }
// }

using System.Security.Claims;
using Microsoft.Extensions.Logging;

public static class UserIdentityExtensions
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        if (user.Identity is ClaimsIdentity identity)
        {
            var userIdClaim = identity.FindFirst("userId");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }
        }
        return 0; // Or handle this scenario appropriately, e.g., throw an exception
    }
}
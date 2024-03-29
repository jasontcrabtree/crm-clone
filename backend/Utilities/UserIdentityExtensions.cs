using System.Security.Claims;

public static class UserIdentityExtensions
{
    public static int? GetUserId(this ClaimsPrincipal user)
    {
        if (user.Identity is ClaimsIdentity identity)
        {
            var userIdClaim = identity.FindFirst("userId");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                return userId;
            }
        }

        return null;
    }
}
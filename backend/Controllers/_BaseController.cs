using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

public abstract class BaseController : ControllerBase
{
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

        throw new InvalidOperationException("User ID not found.");
    }
}
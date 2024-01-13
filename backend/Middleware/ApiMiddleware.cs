public class ApiMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _apiKey;
    private const string APIKEYNAME = "X-API-KEY";

    public ApiMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _apiKey = configuration["ClientServerApiKey"] ?? throw new InvalidOperationException("API key is not configured correctly.");
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // List of paths that are excluded from API Key check
        var excludedPaths = new[] { "/", "/weatherforecast" };

        if (!excludedPaths.Any(path => context.Request.Path.StartsWithSegments(path, StringComparison.OrdinalIgnoreCase)))
        {
            if (!context.Request.Headers.TryGetValue(APIKEYNAME, out var extractedApiKey))
            {
                context.Response.StatusCode = 401; // Unauthorized
                context.Response.ContentType = "application/json";
                var response = new { error = "API Key is missing" };
                await context.Response.WriteAsJsonAsync(response);
                return;
            }

            if (!_apiKey.Equals(extractedApiKey))
            {
                context.Response.StatusCode = 401; // Unauthorized
                context.Response.ContentType = "application/json";
                var response = new { error = "Unauthorized client" };
                await context.Response.WriteAsJsonAsync(response);
                return;
            }
        }

        await _next(context);
    }
}

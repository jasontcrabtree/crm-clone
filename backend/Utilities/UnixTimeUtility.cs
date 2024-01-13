public static class UnixTimeUtility
{
    // Method to get current UNIX time in seconds
    public static long GetCurrentUnixTimeSeconds()
    {
        return DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    }

    // Optionally, add a method for milliseconds if needed
    public static long GetCurrentUnixTimeMilliseconds()
    {
        return DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
    }
}
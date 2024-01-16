public abstract class BaseService
{
    protected int UserId { get; private set; }

    public void SetUserId(int userId)
    {
        UserId = userId;
    }
}
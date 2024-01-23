using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public abstract class BaseModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public long CreatedTimeUnix { get; private set; }
    public long UpdatedTimeUnix { get; private set; }

    public void SetCreatedTime()
    {
        CreatedTimeUnix = UnixTimeUtility.GetCurrentUnixTimeSeconds();
    }

    public void SetUpdatedTime()
    {
        UpdatedTimeUnix = UnixTimeUtility.GetCurrentUnixTimeSeconds();
    }
}

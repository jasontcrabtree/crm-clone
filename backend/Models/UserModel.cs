using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class UserModel : BaseModel
    {
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}

using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UserModel : BaseModel
    {
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        public ICollection<ContactModel>? ContactModels { get; }
    }
}

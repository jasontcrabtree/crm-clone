using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class ContactModel : BaseModel
    {
        public string ContactFirstName { get; set; } = string.Empty;
        [Required]
        public string ContactSurname { get; set; } = string.Empty;
        [Required]
        public string ContactEmail { get; set; } = string.Empty;
        [Required]
        public string ContactPhone { get; set; } = string.Empty;
        public string ContactNotes { get; set; } = string.Empty;
        public ICollection<ConnectionModel>? ConnectionModels { get; }

        // Relates contact to the user who owns that model
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public virtual UserModel? User { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public enum InteractionType
    {
        // Communication Types
        RemoteMeeting,
        InPersonMeeting,
        Phonecall,
        Email,
        Text,
        Conference,
        Adhoc,

        // Interaction Types
        Sale,
        Discovery,
        Demo,
        Collaboration,
        Training,
        Partnership,
        Presentation,
        Mentorship,
        Education,
        Contract,
        CustomerService,
        Dispute,
        Other

    }


    public class InteractionModel : BaseModel
    {
        public DateOnly InteractionDate { get; set; }
        public string InteractionTitle { get; set; } = string.Empty;
        public string InteractionNotes { get; set; } = string.Empty;

        [Required]
        public InteractionType InteractionType { get; set; }
        public ICollection<ConnectionModel>? ConnectionModels { get; }

        // Relates interaction to the user who owns that model
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public virtual UserModel? User { get; set; }
    }
}
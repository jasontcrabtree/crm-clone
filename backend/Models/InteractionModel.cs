using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public enum InteractionType
    {

        // Entity Types
        ContactCreated,
        ContactUpdated,
        ContactDeleted,
        OrganisationCreated,
        OrganisationUpdated,
        OrganisationDeleted,
        ConnectionCreated,
        ConnectionUpdated,
        ConnectionDeleted,
        InteractionCreated,
        InteractionUpdated,
        InteractionDeleted,
        MessageCreated,
        MessageUpdated,
        MessageDeleted,

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
        public string DetailedData { get; set; } = string.Empty;

        [Required]
        public InteractionType InteractionType { get; set; }

        /// <summary>
        /// Optional custom interaction type for unique interactions
        /// </summary>
        public string? CustomInteractionType { get; set; }

        // New fields for polymorphic relationship
        public string? EntityType { get; set; }
        public int EntityId { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public virtual UserModel? User { get; set; }
    }
}
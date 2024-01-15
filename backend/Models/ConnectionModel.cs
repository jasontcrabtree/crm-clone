using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public enum ConnectionType
    {
        Employee,
        ExternalPartner,
        Stakeholder,
        Customer,
        Referral,
        Custom
    }

    public class ConnectionModel : BaseModel
    {
        public string ConnectionLabel { get; set; } = string.Empty;
        public ConnectionType ConnectionType { get; set; }

        // Foreign key for ContactModel
        public int? ContactId { get; set; }
        [ForeignKey("ContactId")]
        public ContactModel? ContactModel { get; set; }

        // Foreign key for OrganisationModel
        public int? OrganisationId { get; set; }
        [ForeignKey("OrganisationId")]
        public OrganisationModel? OrganisationModel { get; set; }

        // Foreign key for InteractionModel
        public int? InteractionId { get; set; }
        [ForeignKey("InteractionId")]
        public InteractionModel? InteractionModel { get; set; }

        // Relates connection to the user who owns that model
        public int UserId { get; set; }
        [ForeignKey("UserId")]

        [JsonIgnore]
        public virtual UserModel? User { get; set; }
    }
}
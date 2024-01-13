using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public int ContactId { get; set; }
        public ContactModel? ContactModel { get; set; }

        public int OrganisationId { get; set; }
        public OrganisationModel? OrganisationModel { get; set; }

        public int InteractionId { get; set; }
        public InteractionModel? InteractionModel { get; set; }
    }
}
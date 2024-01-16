using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class AggregateConnectionModel : ConnectionModel
    {
        public ContactModel? ContactDetails { get; set; }
        public OrganisationModel? OrganisationDetails { get; set; }
        public InteractionModel? InteractionDetails { get; set; }
    }
}

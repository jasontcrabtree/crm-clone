using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    // public enum OrganisationType
    // {
    //     [EnumLabel("Business")]
    //     Business,

    //     [EnumLabel("Government")]
    //     Government,

    //     [EnumLabel("Not For Profit")]
    //     NotForProfit,

    //     [EnumLabel("Charity")]
    //     Charity,

    //     [EnumLabel("Education")]
    //     Education,

    //     [EnumLabel("Healthcare")]
    //     Healthcare,

    //     [EnumLabel("Other")]
    //     Other
    // }
    public enum OrganisationType
    {
        Business,
        Government,
        NotForProfit,
        Charity,
        Education,
        Healthcare,
        Other
    }

    public class OrganisationModel : BaseModel
    {
        public string OrganisationName { get; set; } = string.Empty;
        [Required]
        public string OrganisationWebsite { get; set; } = string.Empty;
        public string OrganisationPhone { get; set; } = string.Empty;
        public string OrganisationAddress { get; set; } = string.Empty;
        [Required]
        public string OrganisationCity { get; set; } = string.Empty;
        [Required]
        public string OrganisationCountry { get; set; } = string.Empty;
        public string OrganisationNotes { get; set; } = string.Empty;

        [Required]
        public OrganisationType OrganisationType { get; set; }
        public ICollection<ConnectionModel>? ConnectionModels { get; }
    }
}
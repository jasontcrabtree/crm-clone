using System.ComponentModel.DataAnnotations;

namespace backend.Models
{

    public enum PizzaFlavor
    {
        Margherita,
        Pepperoni,
        Hawaiian,
        Veggie,
        [EnumLabel("BBQ Chicken")]
        BBQChicken
        // Add other flavors as needed
    }

    public class PizzaFlavorDto
    {
        public PizzaFlavor Flavor { get; set; }
        public string? Label { get; set; }
    }

    public class OrganisationModel
    {
        public int Id { get; set; }
        [Required]
        public string OrganisationName { get; set; } = string.Empty;
        [Required]
        public string OrganisationWebsite { get; set; } = string.Empty;
        public string OrganisationPhone { get; set; } = string.Empty;
        public string OrganisationAddress { get; set; } = string.Empty;
        public string OrganisationCity { get; set; } = string.Empty;
        public string OrganisationCountry { get; set; } = string.Empty;
        public string OrganisationNotes { get; set; } = string.Empty;
        // public string OrganisationType { get; set; } = Dictionary.OrganisationType;
        // public string OrganisationIndustry { get; set; } = Dictionary.OrganizationIndustry.Other;
    }
}
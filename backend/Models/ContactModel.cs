using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class ContactModel
    {
        public int Id { get; set; }

        [Required]
        public string ContactFirstName { get; set; } = string.Empty;
        [Required]
        public string ContactSurname { get; set; } = string.Empty;
        [Required]
        public string ContactEmail { get; set; } = string.Empty;
        [Required]
        public string ContactPhone { get; set; } = string.Empty;
        [Required]
        public string ContactNotes { get; set; } = string.Empty;


    }
}
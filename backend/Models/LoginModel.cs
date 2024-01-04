using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class LoginModel
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}


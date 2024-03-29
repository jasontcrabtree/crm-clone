using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/auth")]
public class AuthController : BaseController
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;
    private readonly ILogger<AuthController> _logger;

    // Update the constructor to accept the new dependencies
    public AuthController(
        IConfiguration configuration,
        AppDbContext context,
        InteractionLoggingService interactionLoggingService,
        ILogger<AuthController> logger
    ) : base(interactionLoggingService, logger)
    {
        _configuration = configuration;
        _context = context;
        _logger = logger;
    }

    [HttpGet("testUserId")]
    public IActionResult TestUserId()
    {
        var userId = GetUserId();
        return Ok($"User ID is: {userId}");
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        if (await _context.Users.AnyAsync(u => u.Username == model.Username))
        {
            return BadRequest("Username already exists.");
        }

        var user = new UserModel { Username = model.Username };
        var hasher = new PasswordHasher<UserModel>();
        user.Password = hasher.HashPassword(user, model.Password);

        _context.Users.Add(user);
        try
        {
            await _context.SaveChangesAsync();
            return Ok(new { message = "User registered successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while registering the user: " + ex.Message);
        }
    }

    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);
        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        var hasher = new PasswordHasher<UserModel>();
        var result = hasher.VerifyHashedPassword(user, user.Password, model.Password);

        if (result != PasswordVerificationResult.Success)
        {
            return Unauthorized("Invalid password.");
        }

        var token = GenerateJwtToken(user);
        return Ok(new
        {
            user.Username,
            Token = token,
        });
    }


    private string GenerateJwtToken(UserModel user)
    {
        var jwtKey = _configuration["Jwt:Key"];
        if (string.IsNullOrEmpty(jwtKey))
        {
            throw new InvalidOperationException("JWT key is not configured correctly.");
        }

        // Assume jwtKey is in Base64 format to ensure we get the correct byte length
        var keyBytes = Convert.FromBase64String(jwtKey); // Decoding from Base64 to get the actual byte array
        if (keyBytes.Length != 32) // 256 bits = 32 bytes
        {
            throw new InvalidOperationException("JWT key must be 256 bits (32 bytes) long.");
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim("userId", user.Id.ToString())
        }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
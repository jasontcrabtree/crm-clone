// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.IdentityModel.Tokens;
// using System.Text;
// using Microsoft.Extensions.Configuration;

// public class Startup
// {
//     private readonly IConfiguration _configuration;

//     public Startup(IConfiguration configuration)
//     {
//         _configuration = configuration;
//     }

//     public void ConfigureServices(IServiceCollection services)
//     {
//         var jwtKey = _configuration["Jwt:Key"];
//         // Check if the JWT key is null or empty
//         if (string.IsNullOrEmpty(jwtKey))
//         {
//             throw new InvalidOperationException("JWT key is not configured correctly.");
//         }
//         var key = Encoding.ASCII.GetBytes(jwtKey);

//         services.AddAuthentication(x =>
//         {
//             x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//             x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//         })
//         .AddJwtBearer(x =>
//         {
//             // ...
//             x.TokenValidationParameters = new TokenValidationParameters
//             {
//                 ValidateIssuerSigningKey = true,
//                 IssuerSigningKey = new SymmetricSecurityKey(key),
//                 ValidateIssuer = false,
//                 ValidateAudience = false
//             };
//         });

//         services.AddCors(options =>
//         {
//             options.AddPolicy("MyNextJsAppPolicy", builder =>
//                {
//                    builder.WithOrigins("https://crm-clone.vercel.app/")
//                           .AllowAnyHeader()
//                           .AllowAnyMethod();
//                });
//         });
//     }

//     public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//     {
//         app.UseCors("MyNextJsAppPolicy");
//         app.UseAuthentication();
//         app.UseAuthorization();
//     }
// }

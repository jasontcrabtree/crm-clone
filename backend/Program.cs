// using Microsoft.EntityFrameworkCore;
// using backend.Models;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.IdentityModel.Tokens;
// using System.Text;

// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.

// // Configure JWT Authentication and add Authorization
// var jwtKey = builder.Configuration["Jwt:Key"];
// if (string.IsNullOrEmpty(jwtKey))
// {
//     throw new InvalidOperationException("JWT key is not configured correctly.");
// }
// var key = Encoding.ASCII.GetBytes(jwtKey);

// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.RequireHttpsMetadata = false; // Set to true in production
//         options.SaveToken = true;
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuerSigningKey = true,
//             IssuerSigningKey = new SymmetricSecurityKey(key),
//             ValidateIssuer = false,
//             ValidateAudience = false
//         };
//     });

// builder.Services.AddAuthorization();
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // var dbPassword = builder.Configuration["DbPassword"];
// // var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") + $"Password={dbPassword};";

// var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

// builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
// app.UseRouting();

// app.UseAuthentication(); // Ensure this is before UseAuthorization
// app.UseAuthorization(); // Add UseAuthorization

// app.MapControllers();

// app.UseMiddleware<ApiMiddleware>();

// // Define your endpoints here
// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/", () => Results.Json(new { Message = "Hello World!" }));

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast = Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .RequireAuthorization() // Require authorization for this endpoint
// .WithName("GetWeatherForecast")
// .WithOpenApi();

// app.Run();

using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure JWT Authentication and add Authorization
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("JWT key is not configured correctly.");
}
var key = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false; // Set to true in production
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Setup CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyNextJsAppPolicy", corsBuilder =>
    {
        corsBuilder.WithOrigins("https://crm-clone.vercel.app/")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
    });
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Database Context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("MyNextJsAppPolicy"); // Enable CORS for local development
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Weather Forecast Endpoint
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.RequireAuthorization() // Require authorization for this endpoint
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

# Backend Docs

Defining the Model: Your ContactModel class defines the schema for a table. Each property in the class represents a column in the table. The [Required] data annotations indicate that these fields are mandatory.

DbContext Integration: To link this model with a database using Entity Framework, you need to include it in a DbContext class in your application. The DbContext serves as a bridge between your C# models and the database.

csharp
Copy code
public class MyDbContext : DbContext
{
public DbSet<ContactModel> Contacts { get; set; }

    // ... DbContext configuration and connection string

}
Database Migrations: If you're using the code-first approach, you'll create a database migration based on your model classes. EF Core migrations generate code to update the database schema to match your model classes.

sql
Copy code
dotnet ef migrations add InitialCreate
dotnet ef database update

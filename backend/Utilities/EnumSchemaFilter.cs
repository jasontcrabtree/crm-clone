
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.Any;
public class EnumSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (context.Type.IsEnum)
        {
            schema.Enum.Clear();
            foreach (var enumName in Enum.GetNames(context.Type))
            {
                schema.Enum.Add(new OpenApiString(enumName));
            }
        }
    }
}
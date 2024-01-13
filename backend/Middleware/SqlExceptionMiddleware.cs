using System;
using System.Data.SqlClient;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

public class SqlExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public SqlExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (SqlException ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, SqlException exception)
    {
        var code = HttpStatusCode.InternalServerError; // 500 if unexpected

        if (exception.Number == -2) // SQL Timeout
        {
            code = HttpStatusCode.RequestTimeout;
        }
        // Add more exception types if needed

        var result = JsonConvert.SerializeObject(new { error = "A database error occurred.", details = exception.Message });
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)code;
        return context.Response.WriteAsync(result);
    }
}

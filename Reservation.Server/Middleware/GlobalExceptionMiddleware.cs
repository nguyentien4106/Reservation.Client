using Microsoft.AspNetCore.Diagnostics;
using Reservation.API.Models.DTO.Auth;
using System.Net;
using System.Text.Json;

namespace Reservation.API.Middleware
{
    public class GlobalExceptionMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new AppResponse<bool>().SetErrorResponse("message", exception.Message, context.Response.StatusCode);
            response.SetErrorResponse("message1", exception.InnerException.Message);
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

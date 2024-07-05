using Microsoft.AspNetCore.Diagnostics;
using Reservation.Domain.Models.DTO.Auth;
using System.Net;
using System.Text.Json;

namespace Reservation.API.Middleware
{
    public class GlobalExceptionMiddleware(RequestDelegate next )
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

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new AppResponse<bool>().SetErrorResponse("message", exception.Message, context.Response.StatusCode);
            if(exception.InnerException != null)
            {
                response.SetErrorResponse("message1", exception?.InnerException?.Message);
            }
            var message = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(message);
        }
    }
}

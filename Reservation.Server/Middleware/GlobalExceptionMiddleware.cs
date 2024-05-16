using Microsoft.AspNetCore.Diagnostics;
using Reservation.Server.Models.DTO.Auth;
using System.Net;
using System.Text.Json;

namespace Reservation.Server.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        public GlobalExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

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
            response.SetErrorResponse("message1", exception.InnerException.Message);
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

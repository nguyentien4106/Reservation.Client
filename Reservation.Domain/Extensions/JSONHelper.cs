using System.Net.Http.Json;
using System.Text.Json;

namespace Reservation.Domain.Extensions
{
    public static class JSONHelper
    {
        public static string ToJSON(this object obj)
        {
            return JsonSerializer.Serialize(obj).ToString();
        }
    }
}

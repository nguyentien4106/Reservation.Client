namespace Reservation.Server.Models.DTO.Home
{
    public class FilterParamsRequest
    {
        public string? City { get; set; } = "All";

        public string? District { get; set; } = "All";

    }
}

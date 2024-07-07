namespace Reservation.Domain.Models.Request.Collaborators
{
    public class GetCollaboratorsRequest : PagingRequest
    {
        private const string All = "All";

        public string City { get; set; } = All;

        public string District { get; set; } = All;

        public string Sex { get; set; } = All;

        public int OrderType { get; set; } = 0;

        public string Services { get; set; } = All;

        public int Status { get; set; } = 0;
    }
}

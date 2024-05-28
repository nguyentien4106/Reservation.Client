using Reservation.Server.Models.DTO.Collaborator;

namespace Reservation.Server.Extensions
{
    public static class ListExtension
    {
        public static List<CollaboratorDTO> OrderByAvgRate(this List<CollaboratorDTO> list)
        {
            return [.. list.OrderBy(x => x.AvgRate)];
        }

        public static List<CollaboratorDTO> OrderByPrice(this List<CollaboratorDTO> list)
        {
            return [.. list.OrderBy(x => x.PricePerHour).ThenBy(item => item.AvgRate)];
        }

        public static List<CollaboratorDTO> OrderByPriceDecreasing(this List<CollaboratorDTO> list)
        {
            return [.. list.OrderByDescending(x => x.PricePerHour).ThenBy(item => item.AvgRate)];
        }

        public static List<CollaboratorDTO> OrderByRateCount(this List<CollaboratorDTO> list)
        {
            return [.. list.OrderBy(x => x.Orders?.Count).ThenBy(item => item.AvgRate)];
        }

        public static List<CollaboratorDTO> OrderByRateCountDecreasing(this List<CollaboratorDTO> list)
        {
            return [.. list.OrderByDescending(x => x.Orders?.Count).ThenBy(item => item.AvgRate)];
        }

        public static List<CollaboratorDTO> OrderByAge(this List<CollaboratorDTO> list)
        {
            return [.. list.OrderBy(x => x.BirthDate).ThenBy(item => item.AvgRate)];
        }

        public static List<CollaboratorDTO> OrderByAgeDecreasing(this List<CollaboratorDTO> list)
        {
            return [.. list.OrderByDescending(x => x.BirthDate).ThenBy(item => item.AvgRate)];
        }
    }
}

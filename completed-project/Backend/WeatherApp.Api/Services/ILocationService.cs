using WeatherApp.Api.Models;

namespace WeatherApp.Api.Services;

public interface ILocationService
{
    IReadOnlyList<LocationInfo> GetAllLocations();
    IReadOnlyList<LocationInfo> SearchLocations(string query);
    LocationInfo? GetLocationById(string id);
}

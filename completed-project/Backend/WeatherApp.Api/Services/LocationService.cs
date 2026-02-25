using WeatherApp.Api.Models;

namespace WeatherApp.Api.Services;

public class LocationService : ILocationService
{
    private static readonly IReadOnlyList<LocationInfo> Locations =
    [
        new("phoenix-az", "Phoenix", "AZ", "US", 33.45, -112.07),
        new("seattle-wa", "Seattle", "WA", "US", 47.61, -122.33),
        new("denver-co", "Denver", "CO", "US", 39.74, -104.98),
        new("miami-fl", "Miami", "FL", "US", 25.76, -80.19),
        new("chicago-il", "Chicago", "IL", "US", 41.88, -87.63),
        new("san-francisco-ca", "San Francisco", "CA", "US", 37.77, -122.42),
        new("new-york-ny", "New York", "NY", "US", 40.71, -74.01),
        new("anchorage-ak", "Anchorage", "AK", "US", 61.22, -149.90),
        new("honolulu-hi", "Honolulu", "HI", "US", 21.31, -157.86),
        new("dallas-tx", "Dallas", "TX", "US", 32.78, -96.80),
    ];

    private static readonly Dictionary<string, LocationInfo> LocationsById =
        Locations.ToDictionary(l => l.Id);

    public IReadOnlyList<LocationInfo> GetAllLocations() => Locations;

    public IReadOnlyList<LocationInfo> SearchLocations(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return Locations;

        var q = query.Trim();
        return Locations
            .Where(l => l.City.Contains(q, StringComparison.OrdinalIgnoreCase)
                     || l.State.Contains(q, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }

    public LocationInfo? GetLocationById(string id) =>
        LocationsById.GetValueOrDefault(id);
}

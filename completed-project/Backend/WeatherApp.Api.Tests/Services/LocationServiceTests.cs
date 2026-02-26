using WeatherApp.Api.Services;

namespace WeatherApp.Api.Tests.Services;

public class LocationServiceTests
{
    private readonly LocationService _sut = new();

    [Fact]
    public void GetAllLocations_ReturnsAllTenCities()
    {
        var locations = _sut.GetAllLocations();
        Assert.Equal(11, locations.Count);
    }

    [Fact]
    public void GetAllLocations_ContainsExpectedCities()
    {
        var locations = _sut.GetAllLocations();
        var cities = locations.Select(l => l.City).ToList();
        Assert.Contains("Phoenix", cities);
        Assert.Contains("Seattle", cities);
        Assert.Contains("Denver", cities);
        Assert.Contains("Miami", cities);
        Assert.Contains("Chicago", cities);
        Assert.Contains("San Francisco", cities);
        Assert.Contains("New York", cities);
        Assert.Contains("Anchorage", cities);
        Assert.Contains("Honolulu", cities);
        Assert.Contains("Dallas", cities);
        Assert.Contains("Las Vegas", cities);
    }

    [Theory]
    [InlineData("Phoenix", "phoenix-az")]
    [InlineData("phoenix", "phoenix-az")]
    [InlineData("PHOENIX", "phoenix-az")]
    [InlineData("Sea", "seattle-wa")]
    public void SearchLocations_FindsByCity_CaseInsensitive(string query, string expectedId)
    {
        var results = _sut.SearchLocations(query);
        Assert.Contains(results, l => l.Id == expectedId);
    }

    [Theory]
    [InlineData("AZ", "phoenix-az")]
    [InlineData("WA", "seattle-wa")]
    [InlineData("az", "phoenix-az")]
    public void SearchLocations_FindsByState_CaseInsensitive(string query, string expectedId)
    {
        var results = _sut.SearchLocations(query);
        Assert.Contains(results, l => l.Id == expectedId);
    }

    [Fact]
    public void SearchLocations_EmptyQuery_ReturnsAll()
    {
        var results = _sut.SearchLocations("");
        Assert.Equal(11, results.Count);
    }

    [Fact]
    public void SearchLocations_WhitespaceQuery_ReturnsAll()
    {
        var results = _sut.SearchLocations("   ");
        Assert.Equal(11, results.Count);
    }

    [Fact]
    public void SearchLocations_NoMatch_ReturnsEmpty()
    {
        var results = _sut.SearchLocations("Atlantis");
        Assert.Empty(results);
    }

    [Fact]
    public void GetLocationById_ValidId_ReturnsLocation()
    {
        var location = _sut.GetLocationById("phoenix-az");
        Assert.NotNull(location);
        Assert.Equal("Phoenix", location.City);
        Assert.Equal("AZ", location.State);
        Assert.Equal("US", location.Country);
    }

    [Fact]
    public void GetLocationById_InvalidId_ReturnsNull()
    {
        var location = _sut.GetLocationById("nonexistent");
        Assert.Null(location);
    }

    [Fact]
    public void AllLocations_HaveValidCoordinates()
    {
        var locations = _sut.GetAllLocations();
        foreach (var loc in locations)
        {
            Assert.InRange(loc.Latitude, -90, 90);
            Assert.InRange(loc.Longitude, -180, 180);
        }
    }
}

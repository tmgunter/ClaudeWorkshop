using NSubstitute;
using WeatherApp.Api.Models;
using WeatherApp.Api.Services;

namespace WeatherApp.Api.Tests.Services;

public class WeatherServiceFacadeTests
{
    private readonly ILocationService _locationService = Substitute.For<ILocationService>();
    private readonly IWeatherDataProvider _weatherDataProvider = Substitute.For<IWeatherDataProvider>();
    private readonly WeatherServiceFacade _sut;

    private static readonly LocationInfo TestLocation = new("test-city", "Test City", "TS", "US", 40.0, -100.0);
    private static readonly List<DailyForecast> TestForecasts = Enumerable.Range(0, 30)
        .Select(i => new DailyForecast(
            DateOnly.FromDateTime(DateTime.Today).AddDays(i),
            80 + i % 5, 60 + i % 5,
            26.7, 15.6, 50, 30,
            WeatherCondition.Sunny, "Clear skies"))
        .ToList();

    public WeatherServiceFacadeTests()
    {
        _sut = new WeatherServiceFacade(_locationService, _weatherDataProvider);
    }

    [Fact]
    public void GetAllLocations_DelegatesToLocationService()
    {
        var expected = new List<LocationInfo> { TestLocation };
        _locationService.GetAllLocations().Returns(expected);

        var result = _sut.GetAllLocations();

        Assert.Same(expected, result);
        _locationService.Received(1).GetAllLocations();
    }

    [Fact]
    public void SearchLocations_DelegatesToLocationService()
    {
        var expected = new List<LocationInfo> { TestLocation };
        _locationService.SearchLocations("test").Returns(expected);

        var result = _sut.SearchLocations("test");

        Assert.Same(expected, result);
        _locationService.Received(1).SearchLocations("test");
    }

    [Fact]
    public void GetFullForecast_ValidLocation_ReturnsResponse()
    {
        _locationService.GetLocationById("test-city").Returns(TestLocation);
        _weatherDataProvider.GetForecast(TestLocation, Arg.Any<DateOnly>(), 30).Returns(TestForecasts);

        var result = _sut.GetFullForecast("test-city");

        Assert.NotNull(result);
        Assert.Equal(TestLocation, result.Location);
        Assert.Equal(TestForecasts[0], result.Today);
        Assert.Equal(7, result.WeeklyForecast.Count);
        Assert.Equal(30, result.MonthlyForecast.Count);
    }

    [Fact]
    public void GetFullForecast_InvalidLocation_ReturnsNull()
    {
        _locationService.GetLocationById("nonexistent").Returns((LocationInfo?)null);

        var result = _sut.GetFullForecast("nonexistent");

        Assert.Null(result);
    }

    [Fact]
    public void GetTodayForecast_ValidLocation_ReturnsSingleDay()
    {
        var todayForecast = new List<DailyForecast> { TestForecasts[0] };
        _locationService.GetLocationById("test-city").Returns(TestLocation);
        _weatherDataProvider.GetForecast(TestLocation, Arg.Any<DateOnly>(), 1).Returns(todayForecast);

        var result = _sut.GetTodayForecast("test-city");

        Assert.NotNull(result);
        Assert.Equal(TestForecasts[0].HighTempF, result.HighTempF);
    }

    [Fact]
    public void GetTodayForecast_InvalidLocation_ReturnsNull()
    {
        _locationService.GetLocationById("nonexistent").Returns((LocationInfo?)null);

        var result = _sut.GetTodayForecast("nonexistent");

        Assert.Null(result);
    }

    [Fact]
    public void GetWeeklyForecast_ValidLocation_ReturnsSevenDays()
    {
        var weeklyForecasts = TestForecasts.Take(7).ToList();
        _locationService.GetLocationById("test-city").Returns(TestLocation);
        _weatherDataProvider.GetForecast(TestLocation, Arg.Any<DateOnly>(), 7).Returns(weeklyForecasts);

        var result = _sut.GetWeeklyForecast("test-city");

        Assert.NotNull(result);
        Assert.Equal(7, result.Count);
    }

    [Fact]
    public void GetWeeklyForecast_InvalidLocation_ReturnsNull()
    {
        _locationService.GetLocationById("nonexistent").Returns((LocationInfo?)null);

        var result = _sut.GetWeeklyForecast("nonexistent");

        Assert.Null(result);
    }

    [Fact]
    public void GetMonthlyForecast_ValidLocation_ReturnsThirtyDays()
    {
        _locationService.GetLocationById("test-city").Returns(TestLocation);
        _weatherDataProvider.GetForecast(TestLocation, Arg.Any<DateOnly>(), 30).Returns(TestForecasts);

        var result = _sut.GetMonthlyForecast("test-city");

        Assert.NotNull(result);
        Assert.Equal(30, result.Count);
    }

    [Fact]
    public void GetMonthlyForecast_InvalidLocation_ReturnsNull()
    {
        _locationService.GetLocationById("nonexistent").Returns((LocationInfo?)null);

        var result = _sut.GetMonthlyForecast("nonexistent");

        Assert.Null(result);
    }
}

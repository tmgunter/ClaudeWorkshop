using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using WeatherApp.Api.Controllers;
using WeatherApp.Api.Models;
using WeatherApp.Api.Services;

namespace WeatherApp.Api.Tests.Controllers;

public class WeatherControllerTests
{
    private readonly IWeatherService _weatherService = Substitute.For<IWeatherService>();
    private readonly WeatherController _sut;

    private static readonly LocationInfo TestLocation = new("test-city", "Test City", "TS", "US", 40.0, -100.0);
    private static readonly DailyForecast TestForecast = new(
        DateOnly.FromDateTime(DateTime.Today), 85, 65, 29.4, 18.3, 50, 30,
        WeatherCondition.Sunny, "Clear skies");
    private static readonly WeatherResponse TestResponse = new(
        TestLocation, TestForecast,
        [TestForecast, TestForecast, TestForecast, TestForecast, TestForecast, TestForecast, TestForecast],
        Enumerable.Repeat(TestForecast, 30).ToList());

    public WeatherControllerTests()
    {
        _sut = new WeatherController(_weatherService);
    }

    [Fact]
    public void GetLocations_ReturnsOkWithLocations()
    {
        var locations = new List<LocationInfo> { TestLocation };
        _weatherService.GetAllLocations().Returns(locations);

        var result = _sut.GetLocations();

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Same(locations, okResult.Value);
    }

    [Fact]
    public void SearchLocations_ReturnsOkWithResults()
    {
        var locations = new List<LocationInfo> { TestLocation };
        _weatherService.SearchLocations("test").Returns(locations);

        var result = _sut.SearchLocations("test");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Same(locations, okResult.Value);
    }

    [Fact]
    public void SearchLocations_DefaultEmptyQuery_ReturnsOk()
    {
        var locations = new List<LocationInfo> { TestLocation };
        _weatherService.SearchLocations("").Returns(locations);

        var result = _sut.SearchLocations();

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Same(locations, okResult.Value);
    }

    [Fact]
    public void GetFullForecast_ValidLocation_ReturnsOk()
    {
        _weatherService.GetFullForecast("test-city").Returns(TestResponse);

        var result = _sut.GetFullForecast("test-city");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Same(TestResponse, okResult.Value);
    }

    [Fact]
    public void GetFullForecast_InvalidLocation_ReturnsNotFound()
    {
        _weatherService.GetFullForecast("nonexistent").Returns((WeatherResponse?)null);

        var result = _sut.GetFullForecast("nonexistent");

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void GetTodayForecast_ValidLocation_ReturnsOk()
    {
        _weatherService.GetTodayForecast("test-city").Returns(TestForecast);

        var result = _sut.GetTodayForecast("test-city");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Same(TestForecast, okResult.Value);
    }

    [Fact]
    public void GetTodayForecast_InvalidLocation_ReturnsNotFound()
    {
        _weatherService.GetTodayForecast("nonexistent").Returns((DailyForecast?)null);

        var result = _sut.GetTodayForecast("nonexistent");

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void GetWeeklyForecast_ValidLocation_ReturnsOk()
    {
        var weekly = new List<DailyForecast> { TestForecast };
        _weatherService.GetWeeklyForecast("test-city").Returns(weekly);

        var result = _sut.GetWeeklyForecast("test-city");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Same(weekly, okResult.Value);
    }

    [Fact]
    public void GetWeeklyForecast_InvalidLocation_ReturnsNotFound()
    {
        _weatherService.GetWeeklyForecast("nonexistent").Returns((IReadOnlyList<DailyForecast>?)null);

        var result = _sut.GetWeeklyForecast("nonexistent");

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void GetMonthlyForecast_ValidLocation_ReturnsOk()
    {
        var monthly = new List<DailyForecast> { TestForecast };
        _weatherService.GetMonthlyForecast("test-city").Returns(monthly);

        var result = _sut.GetMonthlyForecast("test-city");

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Same(monthly, okResult.Value);
    }

    [Fact]
    public void GetMonthlyForecast_InvalidLocation_ReturnsNotFound()
    {
        _weatherService.GetMonthlyForecast("nonexistent").Returns((IReadOnlyList<DailyForecast>?)null);

        var result = _sut.GetMonthlyForecast("nonexistent");

        Assert.IsType<NotFoundResult>(result);
    }
}

using WeatherApp.Api.Models;

namespace WeatherApp.Api.Services;

public class WeatherServiceFacade(
    ILocationService locationService,
    IWeatherDataProvider weatherDataProvider) : IWeatherService
{
    public IReadOnlyList<LocationInfo> GetAllLocations() =>
        locationService.GetAllLocations();

    public IReadOnlyList<LocationInfo> SearchLocations(string query) =>
        locationService.SearchLocations(query);

    public WeatherResponse? GetFullForecast(string locationId)
    {
        var location = locationService.GetLocationById(locationId);
        if (location is null) return null;

        var today = DateOnly.FromDateTime(DateTime.Today);
        var allDays = weatherDataProvider.GetForecast(location, today, 30);

        return new WeatherResponse(
            location,
            allDays[0],
            allDays.Take(7).ToList(),
            allDays
        );
    }

    public DailyForecast? GetTodayForecast(string locationId)
    {
        var location = locationService.GetLocationById(locationId);
        if (location is null) return null;

        var today = DateOnly.FromDateTime(DateTime.Today);
        var forecast = weatherDataProvider.GetForecast(location, today, 1);
        return forecast[0];
    }

    public IReadOnlyList<DailyForecast>? GetWeeklyForecast(string locationId)
    {
        var location = locationService.GetLocationById(locationId);
        if (location is null) return null;

        var today = DateOnly.FromDateTime(DateTime.Today);
        return weatherDataProvider.GetForecast(location, today, 7);
    }

    public IReadOnlyList<DailyForecast>? GetMonthlyForecast(string locationId)
    {
        var location = locationService.GetLocationById(locationId);
        if (location is null) return null;

        var today = DateOnly.FromDateTime(DateTime.Today);
        return weatherDataProvider.GetForecast(location, today, 30);
    }
}

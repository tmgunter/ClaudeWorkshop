using WeatherApp.Api.Models;

namespace WeatherApp.Api.Services;

public interface IWeatherService
{
    IReadOnlyList<LocationInfo> GetAllLocations();
    IReadOnlyList<LocationInfo> SearchLocations(string query);
    WeatherResponse? GetFullForecast(string locationId);
    DailyForecast? GetTodayForecast(string locationId);
    IReadOnlyList<DailyForecast>? GetWeeklyForecast(string locationId);
    IReadOnlyList<DailyForecast>? GetMonthlyForecast(string locationId);
}

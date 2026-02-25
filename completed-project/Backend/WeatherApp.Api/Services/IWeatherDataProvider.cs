using WeatherApp.Api.Models;

namespace WeatherApp.Api.Services;

public interface IWeatherDataProvider
{
    IReadOnlyList<DailyForecast> GetForecast(LocationInfo location, DateOnly startDate, int days);
}

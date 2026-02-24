namespace WeatherApp.Api.Models;

public record WeatherResponse(
    LocationInfo Location,
    DailyForecast Today,
    IReadOnlyList<DailyForecast> WeeklyForecast,
    IReadOnlyList<DailyForecast> MonthlyForecast
);

namespace WeatherApp.Api.Models;

public record DailyForecast(
    DateOnly Date,
    double HighTempF,
    double LowTempF,
    double HighTempC,
    double LowTempC,
    int HumidityPercent,
    int PrecipitationChancePercent,
    WeatherCondition Condition,
    string ConditionDescription
);

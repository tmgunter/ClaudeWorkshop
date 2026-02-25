using WeatherApp.Api.Models;

namespace WeatherApp.Api.Services;

public class MockWeatherDataProvider : IWeatherDataProvider
{
    private record ClimateProfile(
        double[] MonthlyHighF,
        double[] MonthlyLowF,
        int[] MonthlyPrecipChance,
        int[] MonthlyHumidity,
        WeatherCondition[] SeasonalConditions
    );

    // Seasonal conditions: [Winter, Spring, Summer, Fall]
    private static readonly Dictionary<string, ClimateProfile> ClimateProfiles = new()
    {
        ["phoenix-az"] = new(
            [67, 71, 78, 86, 95, 104, 108, 105, 100, 89, 76, 66],
            [45, 48, 52, 59, 68, 77, 84, 83, 76, 64, 52, 44],
            [15, 12, 10, 5, 3, 2, 5, 8, 7, 8, 10, 15],
            [35, 28, 22, 15, 12, 10, 20, 28, 25, 22, 28, 35],
            [WeatherCondition.Sunny, WeatherCondition.Sunny, WeatherCondition.Sunny, WeatherCondition.Sunny]
        ),
        ["seattle-wa"] = new(
            [47, 50, 54, 59, 65, 70, 76, 76, 70, 60, 51, 46],
            [36, 37, 39, 42, 48, 52, 56, 56, 52, 45, 39, 35],
            [70, 60, 55, 40, 30, 20, 15, 15, 25, 45, 65, 70],
            [78, 72, 68, 60, 55, 52, 50, 52, 58, 68, 75, 80],
            [WeatherCondition.Rain, WeatherCondition.Cloudy, WeatherCondition.PartlyCloudy, WeatherCondition.Rain]
        ),
        ["denver-co"] = new(
            [45, 48, 55, 62, 71, 82, 90, 88, 80, 66, 52, 44],
            [16, 19, 26, 33, 42, 51, 58, 56, 47, 35, 24, 16],
            [40, 35, 40, 45, 45, 30, 25, 30, 25, 25, 35, 40],
            [45, 42, 40, 42, 48, 38, 35, 38, 36, 38, 42, 45],
            [WeatherCondition.Snow, WeatherCondition.PartlyCloudy, WeatherCondition.Sunny, WeatherCondition.PartlyCloudy]
        ),
        ["miami-fl"] = new(
            [76, 78, 80, 84, 87, 90, 91, 91, 89, 86, 81, 77],
            [60, 62, 65, 68, 73, 76, 77, 77, 76, 73, 67, 62],
            [30, 25, 25, 30, 45, 55, 60, 60, 65, 55, 35, 30],
            [65, 62, 60, 62, 68, 72, 73, 74, 76, 72, 68, 66],
            [WeatherCondition.Sunny, WeatherCondition.PartlyCloudy, WeatherCondition.Thunderstorm, WeatherCondition.PartlyCloudy]
        ),
        ["chicago-il"] = new(
            [32, 36, 47, 59, 70, 80, 84, 82, 75, 62, 48, 35],
            [18, 21, 31, 41, 51, 61, 67, 66, 57, 45, 33, 22],
            [45, 40, 45, 50, 45, 40, 35, 35, 35, 40, 45, 50],
            [72, 68, 62, 58, 58, 60, 62, 66, 66, 62, 68, 74],
            [WeatherCondition.Snow, WeatherCondition.Cloudy, WeatherCondition.PartlyCloudy, WeatherCondition.Cloudy]
        ),
        ["san-francisco-ca"] = new(
            [57, 60, 63, 65, 66, 70, 72, 72, 73, 69, 63, 57],
            [46, 48, 49, 50, 52, 54, 55, 56, 55, 53, 49, 46],
            [50, 45, 35, 20, 10, 3, 1, 2, 5, 15, 35, 50],
            [78, 75, 70, 65, 68, 72, 78, 78, 70, 65, 72, 78],
            [WeatherCondition.Rain, WeatherCondition.Fog, WeatherCondition.Fog, WeatherCondition.Cloudy]
        ),
        ["new-york-ny"] = new(
            [38, 42, 50, 62, 72, 80, 85, 84, 76, 64, 54, 42],
            [26, 28, 34, 44, 54, 63, 69, 68, 61, 50, 40, 30],
            [40, 38, 42, 45, 45, 42, 40, 40, 38, 38, 40, 42],
            [62, 58, 55, 55, 58, 62, 64, 66, 64, 60, 60, 64],
            [WeatherCondition.Snow, WeatherCondition.Cloudy, WeatherCondition.PartlyCloudy, WeatherCondition.Cloudy]
        ),
        ["anchorage-ak"] = new(
            [22, 26, 34, 44, 56, 63, 65, 63, 55, 40, 28, 23],
            [8, 11, 17, 28, 38, 47, 52, 50, 41, 28, 14, 9],
            [50, 40, 35, 25, 20, 25, 30, 40, 50, 55, 50, 50],
            [68, 62, 55, 48, 45, 52, 58, 65, 68, 72, 70, 70],
            [WeatherCondition.Snow, WeatherCondition.Snow, WeatherCondition.Cloudy, WeatherCondition.Snow]
        ),
        ["honolulu-hi"] = new(
            [80, 80, 82, 83, 85, 87, 88, 89, 89, 87, 84, 81],
            [66, 65, 67, 68, 70, 72, 74, 74, 74, 72, 70, 67],
            [40, 35, 35, 30, 25, 15, 15, 15, 20, 25, 35, 40],
            [72, 70, 68, 65, 62, 60, 62, 62, 64, 66, 70, 72],
            [WeatherCondition.Rain, WeatherCondition.PartlyCloudy, WeatherCondition.Sunny, WeatherCondition.PartlyCloudy]
        ),
        ["dallas-tx"] = new(
            [55, 60, 68, 76, 84, 93, 97, 97, 89, 78, 66, 56],
            [36, 40, 48, 56, 65, 73, 77, 77, 69, 57, 46, 38],
            [30, 35, 40, 45, 45, 30, 20, 20, 30, 40, 35, 35],
            [55, 58, 58, 62, 65, 55, 48, 48, 55, 60, 60, 58],
            [WeatherCondition.Cloudy, WeatherCondition.PartlyCloudy, WeatherCondition.Sunny, WeatherCondition.PartlyCloudy]
        ),
    };

    public IReadOnlyList<DailyForecast> GetForecast(LocationInfo location, DateOnly startDate, int days)
    {
        var profile = ClimateProfiles.GetValueOrDefault(location.Id);
        if (profile is null)
            return [];

        var forecasts = new List<DailyForecast>(days);
        for (var i = 0; i < days; i++)
        {
            var date = startDate.AddDays(i);
            forecasts.Add(GenerateDay(location.Id, date, profile));
        }
        return forecasts;
    }

    private static DailyForecast GenerateDay(string locationId, DateOnly date, ClimateProfile profile)
    {
        var seed = HashCode.Combine(locationId, date.DayNumber);
        var rng = new Random(seed);

        var month = date.Month - 1; // 0-indexed
        var nextMonth = (month + 1) % 12;
        var dayOfMonth = date.Day;
        var daysInMonth = DateTime.DaysInMonth(date.Year, date.Month);
        var lerp = (double)dayOfMonth / daysInMonth;

        var baseHigh = Lerp(profile.MonthlyHighF[month], profile.MonthlyHighF[nextMonth], lerp);
        var baseLow = Lerp(profile.MonthlyLowF[month], profile.MonthlyLowF[nextMonth], lerp);
        var basePrecip = Lerp(profile.MonthlyPrecipChance[month], profile.MonthlyPrecipChance[nextMonth], lerp);
        var baseHumidity = Lerp(profile.MonthlyHumidity[month], profile.MonthlyHumidity[nextMonth], lerp);

        var highF = Math.Round(baseHigh + rng.Next(-5, 6), 1);
        var lowF = Math.Round(baseLow + rng.Next(-5, 6), 1);
        if (lowF >= highF) lowF = highF - rng.Next(5, 15);

        var precipChance = Math.Clamp((int)(basePrecip + rng.Next(-10, 11)), 0, 100);
        var humidity = Math.Clamp((int)(baseHumidity + rng.Next(-8, 9)), 0, 100);

        var season = GetSeason(date.Month);
        var condition = DetermineCondition(precipChance, profile.SeasonalConditions[season], rng);
        var description = GetConditionDescription(condition);

        var highC = Math.Round((highF - 32) * 5.0 / 9.0, 1);
        var lowC = Math.Round((lowF - 32) * 5.0 / 9.0, 1);

        return new DailyForecast(date, highF, lowF, highC, lowC, humidity, precipChance, condition, description);
    }

    private static double Lerp(double a, double b, double t) => a + (b - a) * t;

    private static int GetSeason(int month) => month switch
    {
        12 or 1 or 2 => 0,  // Winter
        3 or 4 or 5 => 1,   // Spring
        6 or 7 or 8 => 2,   // Summer
        _ => 3               // Fall
    };

    private static WeatherCondition DetermineCondition(int precipChance, WeatherCondition seasonal, Random rng)
    {
        if (precipChance > 60)
        {
            return seasonal switch
            {
                WeatherCondition.Snow => WeatherCondition.Snow,
                WeatherCondition.Thunderstorm => rng.Next(2) == 0
                    ? WeatherCondition.Thunderstorm
                    : WeatherCondition.Rain,
                _ => WeatherCondition.Rain,
            };
        }

        if (precipChance > 35)
        {
            return rng.Next(3) switch
            {
                0 => WeatherCondition.Cloudy,
                1 => seasonal,
                _ => WeatherCondition.PartlyCloudy,
            };
        }

        if (precipChance > 15)
        {
            return rng.Next(2) == 0 ? WeatherCondition.PartlyCloudy : seasonal;
        }

        return seasonal;
    }

    private static string GetConditionDescription(WeatherCondition condition) => condition switch
    {
        WeatherCondition.Sunny => "Clear skies with bright sunshine",
        WeatherCondition.PartlyCloudy => "Mix of sun and clouds",
        WeatherCondition.Cloudy => "Overcast with heavy cloud cover",
        WeatherCondition.Rain => "Rainy with steady precipitation",
        WeatherCondition.Thunderstorm => "Thunderstorms with lightning",
        WeatherCondition.Snow => "Snowfall expected",
        WeatherCondition.Fog => "Foggy with reduced visibility",
        WeatherCondition.Windy => "Strong winds throughout the day",
        _ => "Variable conditions"
    };
}

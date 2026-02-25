using WeatherApp.Api.Models;
using WeatherApp.Api.Services;

namespace WeatherApp.Api.Tests.Services;

public class MockWeatherDataProviderTests
{
    private readonly MockWeatherDataProvider _sut = new();

    private static readonly LocationInfo Phoenix = new("phoenix-az", "Phoenix", "AZ", "US", 33.45, -112.07);
    private static readonly LocationInfo Seattle = new("seattle-wa", "Seattle", "WA", "US", 47.61, -122.33);
    private static readonly LocationInfo Denver = new("denver-co", "Denver", "CO", "US", 39.74, -104.98);
    private static readonly LocationInfo Honolulu = new("honolulu-hi", "Honolulu", "HI", "US", 21.31, -157.86);

    [Fact]
    public void GetForecast_ReturnsCorrectNumberOfDays()
    {
        var result = _sut.GetForecast(Phoenix, new DateOnly(2026, 7, 1), 7);
        Assert.Equal(7, result.Count);
    }

    [Fact]
    public void GetForecast_ThirtyDays_ReturnsThirty()
    {
        var result = _sut.GetForecast(Seattle, new DateOnly(2026, 1, 1), 30);
        Assert.Equal(30, result.Count);
    }

    [Fact]
    public void GetForecast_ZeroDays_ReturnsEmpty()
    {
        var result = _sut.GetForecast(Phoenix, new DateOnly(2026, 1, 1), 0);
        Assert.Empty(result);
    }

    [Fact]
    public void GetForecast_SingleDay_ReturnsSingle()
    {
        var result = _sut.GetForecast(Phoenix, new DateOnly(2026, 6, 15), 1);
        Assert.Single(result);
    }

    [Fact]
    public void GetForecast_IsDeterministic()
    {
        var date = new DateOnly(2026, 3, 15);
        var result1 = _sut.GetForecast(Phoenix, date, 7);
        var result2 = _sut.GetForecast(Phoenix, date, 7);

        for (var i = 0; i < 7; i++)
        {
            Assert.Equal(result1[i].HighTempF, result2[i].HighTempF);
            Assert.Equal(result1[i].LowTempF, result2[i].LowTempF);
            Assert.Equal(result1[i].Condition, result2[i].Condition);
        }
    }

    [Fact]
    public void GetForecast_PhoenixJuly_HasRealisticHotTemps()
    {
        var result = _sut.GetForecast(Phoenix, new DateOnly(2026, 7, 1), 7);
        foreach (var day in result)
        {
            Assert.True(day.HighTempF > 90, $"Phoenix July high should be > 90°F, got {day.HighTempF}");
            Assert.True(day.LowTempF > 70, $"Phoenix July low should be > 70°F, got {day.LowTempF}");
        }
    }

    [Fact]
    public void GetForecast_SeattleJanuary_HasCoolTemps()
    {
        var result = _sut.GetForecast(Seattle, new DateOnly(2026, 1, 15), 7);
        foreach (var day in result)
        {
            Assert.True(day.HighTempF < 60, $"Seattle Jan high should be < 60°F, got {day.HighTempF}");
        }
    }

    [Fact]
    public void GetForecast_DenverDecember_CanProduceSnow()
    {
        var result = _sut.GetForecast(Denver, new DateOnly(2026, 12, 1), 30);
        Assert.Contains(result, d => d.Condition == WeatherCondition.Snow);
    }

    [Fact]
    public void GetForecast_HonoluluYearRound_WarmTemps()
    {
        var result = _sut.GetForecast(Honolulu, new DateOnly(2026, 1, 1), 30);
        foreach (var day in result)
        {
            Assert.True(day.HighTempF > 70, $"Honolulu high should be > 70°F, got {day.HighTempF}");
        }
    }

    [Fact]
    public void GetForecast_TemperaturesConvertCorrectly()
    {
        var result = _sut.GetForecast(Phoenix, new DateOnly(2026, 6, 1), 7);
        foreach (var day in result)
        {
            var expectedHighC = Math.Round((day.HighTempF - 32) * 5.0 / 9.0, 1);
            var expectedLowC = Math.Round((day.LowTempF - 32) * 5.0 / 9.0, 1);
            Assert.Equal(expectedHighC, day.HighTempC);
            Assert.Equal(expectedLowC, day.LowTempC);
        }
    }

    [Fact]
    public void GetForecast_LowAlwaysLessThanHigh()
    {
        var result = _sut.GetForecast(Denver, new DateOnly(2026, 1, 1), 30);
        foreach (var day in result)
        {
            Assert.True(day.LowTempF < day.HighTempF, $"Low {day.LowTempF} should be < High {day.HighTempF}");
        }
    }

    [Fact]
    public void GetForecast_HumidityInValidRange()
    {
        var result = _sut.GetForecast(Seattle, new DateOnly(2026, 6, 1), 30);
        foreach (var day in result)
        {
            Assert.InRange(day.HumidityPercent, 0, 100);
        }
    }

    [Fact]
    public void GetForecast_PrecipitationInValidRange()
    {
        var result = _sut.GetForecast(Phoenix, new DateOnly(2026, 1, 1), 30);
        foreach (var day in result)
        {
            Assert.InRange(day.PrecipitationChancePercent, 0, 100);
        }
    }

    [Fact]
    public void GetForecast_DatesAreSequential()
    {
        var start = new DateOnly(2026, 3, 1);
        var result = _sut.GetForecast(Phoenix, start, 10);
        for (var i = 0; i < 10; i++)
        {
            Assert.Equal(start.AddDays(i), result[i].Date);
        }
    }

    [Fact]
    public void GetForecast_UnknownLocation_ReturnsEmpty()
    {
        var unknown = new LocationInfo("unknown", "Nowhere", "XX", "US", 0, 0);
        var result = _sut.GetForecast(unknown, new DateOnly(2026, 1, 1), 7);
        Assert.Empty(result);
    }

    [Fact]
    public void GetForecast_AllConditionsHaveDescriptions()
    {
        var result = _sut.GetForecast(Seattle, new DateOnly(2026, 1, 1), 30);
        foreach (var day in result)
        {
            Assert.False(string.IsNullOrEmpty(day.ConditionDescription));
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using WeatherApp.Api.Services;

namespace WeatherApp.Api.Controllers;

[ApiController]
[Route("api/weather")]
public class WeatherController(IWeatherService weatherService) : ControllerBase
{
    [HttpGet("locations")]
    public IActionResult GetLocations()
    {
        return Ok(weatherService.GetAllLocations());
    }

    [HttpGet("locations/search")]
    public IActionResult SearchLocations([FromQuery] string q = "")
    {
        return Ok(weatherService.SearchLocations(q));
    }

    [HttpGet("forecast/{locationId}")]
    public IActionResult GetFullForecast(string locationId)
    {
        var result = weatherService.GetFullForecast(locationId);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("forecast/{locationId}/today")]
    public IActionResult GetTodayForecast(string locationId)
    {
        var result = weatherService.GetTodayForecast(locationId);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("forecast/{locationId}/weekly")]
    public IActionResult GetWeeklyForecast(string locationId)
    {
        var result = weatherService.GetWeeklyForecast(locationId);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("forecast/{locationId}/monthly")]
    public IActionResult GetMonthlyForecast(string locationId)
    {
        var result = weatherService.GetMonthlyForecast(locationId);
        return result is null ? NotFound() : Ok(result);
    }
}

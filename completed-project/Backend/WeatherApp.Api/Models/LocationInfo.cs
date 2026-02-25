namespace WeatherApp.Api.Models;

public record LocationInfo(
    string Id,
    string City,
    string State,
    string Country,
    double Latitude,
    double Longitude
);

# Backend - WeatherApp API

## Tech Stack

- .NET 10.0, ASP.NET Core, C#
- xUnit + NSubstitute for testing, Coverlet for code coverage
- No database — mock data provider generates deterministic weather

## Build & Run

```bash
dotnet run --project WeatherApp.Api --launch-profile http    # Run on port 5000
dotnet test --settings coverlet.runsettings --collect:"XPlat Code Coverage"  # Tests + coverage
```

Solution file: `WeatherApp.slnx`

## Project Structure

- **WeatherApp.Api/** - Main API project
  - `Controllers/WeatherController.cs` - Single controller, all weather endpoints
  - `Models/` - `DailyForecast`, `LocationInfo`, `WeatherCondition`, `WeatherResponse` (records)
  - `Services/` - Interfaces: `IWeatherService`, `IWeatherDataProvider`, `ILocationService`
    - `WeatherServiceFacade` - Facade pattern orchestrating location + data providers
    - `MockWeatherDataProvider` - Deterministic weather using seed-based RNG per city
    - `LocationService` - Hardcoded list of 10 US cities
  - `Program.cs` - DI container setup, CORS, JSON serialization config
- **WeatherApp.Api.Tests/** - xUnit tests mirroring API structure

## Design Patterns

- **Facade** (`WeatherServiceFacade`) - Orchestrates `ILocationService` + `IWeatherDataProvider`
- **Dependency Injection** - All services registered as singletons (stateless)
- **Provider** (`IWeatherDataProvider`) - Abstraction for weather data source

## API Endpoints

- `GET /api/weather/locations` - List all locations
- `GET /api/weather/locations/search?query=` - Search locations
- `GET /api/weather/forecast/{locationId}` - Full forecast
- `GET /api/weather/forecast/{locationId}/today` - Today only
- `GET /api/weather/forecast/{locationId}/weekly` - 7-day forecast
- `GET /api/weather/forecast/{locationId}/monthly` - 30-day forecast

## CORS

Configured for `http://localhost:5173` (Frontend dev server).

## Conventions

- Use records for immutable data models
- All services registered as singletons
- Enum serialization: `JsonStringEnumConverter` produces camelCase JSON values

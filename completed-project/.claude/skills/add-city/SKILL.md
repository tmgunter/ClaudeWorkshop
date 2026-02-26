---
name: add-city
description: Add a new US city to the weather app with realistic climate data
disable-model-invocation: true
argument-hint: "[city, state]"
---

Walk the user through adding a new US city to the weather application. This involves updating both the location registry and climate profile.

## City to Add

$ARGUMENTS

If no city was provided, ask the user which US city they'd like to add.

## Files to Modify

1. **`Backend/WeatherApp.Api/Services/LocationService.cs`** — Add the new city to the `_locations` list
   - Pick the next available ID (look at existing entries)
   - Include accurate latitude/longitude for the city

2. **`Backend/WeatherApp.Api/Services/MockWeatherDataProvider.cs`** — Add a `ClimateProfile` for the new city
   - Research realistic monthly climate data: average highs, lows, precipitation chance, humidity
   - Choose appropriate seasonal `WeatherCondition` values (e.g., snow-prone cities should have Snow in winter months)
   - Follow the exact same pattern as existing profiles

## Validation

After making changes:
1. Run backend tests: `cd Backend && dotnet test --verbosity normal`
2. If the backend is running, fetch the new city's forecast to show the user:
   `curl -s http://localhost:5000/api/weather/forecast/{newId}/today`

## Guidelines

- Keep the climate profile realistic — the mock data should feel believable
- Match the coding style of existing entries exactly (spacing, naming, ordering)
- The location ID should follow the existing sequential pattern

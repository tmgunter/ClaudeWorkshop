# ClaudeWorkshop - Weather App

## Project Overview

Full-stack weather application with a C# .NET 10 backend API and React 19 + TypeScript frontend. Uses mock weather data for 10 US cities with realistic climate profiles.

## Architecture

- **Backend/** - ASP.NET Core Web API (.NET 10)
  - Facade pattern for weather service abstraction
  - Mock data provider with seed-based deterministic weather generation
  - REST endpoints under `/api/weather/` for locations, forecasts (today, weekly, monthly)
- **Frontend/** - React 19 + Vite 7 + TypeScript SPA
  - Component-based architecture with React Context API for state management
  - Custom hooks (`useWeather`, `useFavorites`) for data fetching and local storage
  - CSS-per-component styling (no CSS-in-JS framework)

## Running the Application

```bash
# Backend (port 5000)
cd Backend && dotnet run --project WeatherApp.Api --launch-profile http

# Frontend (port 5173)
cd Frontend && npm install && npm run dev
```

## Testing

```bash
# Backend unit tests with coverage
cd Backend && dotnet test --settings coverlet.runsettings --collect:"XPlat Code Coverage"

# Frontend unit tests with coverage
cd Frontend && npx vitest run --coverage

# Frontend E2E tests (auto-starts both servers)
cd Frontend && npx playwright test
```

Coverage threshold: 90% for statements, branches, functions, and lines.

## Code Conventions

- Backend: C# with file-scoped namespaces, records for immutable data models, DI via ASP.NET Core container
- Frontend: Functional React components only, TypeScript strict mode, CSS file per component
- Backend enum serialization uses `JsonStringEnumConverter` (camelCase output); Frontend enum values must match

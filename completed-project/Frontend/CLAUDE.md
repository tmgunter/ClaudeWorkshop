# Frontend - Weather App

## Tech Stack

- React 19, TypeScript 5.9, Vite 7
- Vitest + Testing Library for unit tests
- Playwright for E2E tests
- Custom CSS per component (no UI framework)

## Build & Run

```bash
npm install              # Install dependencies
npm run dev              # Dev server on port 5173
npm run build            # Production build (tsc + vite build)
npm run lint             # ESLint check
npx vitest run --coverage  # Unit tests with coverage
npx playwright test      # E2E tests (auto-starts backend + frontend)
```

## Project Structure

- **src/components/** - Each component in its own directory with `.tsx` + `.css`
  - `DayCard`, `Favorites`, `Header`, `LocationSearch`, `MonthlyForecast`, `TempToggle`, `TodayForecast`, `WeatherIcon`, `WeeklyForecast`
- **src/context/** - React Context providers (`WeatherContext`, `FavoritesContext`)
- **src/hooks/** - Custom hooks (`useWeather`, `useFavorites`)
- **src/services/weatherApi.ts** - API client (fetch-based, base URL `http://localhost:5000`)
- **src/types/weather.ts** - TypeScript types and enums
- **src/__tests__/** - Unit tests mirroring `src/` structure
- **e2e/** - Playwright E2E specs + evidence screenshots

## Testing Conventions

- Unit tests in `src/__tests__/` with paths mirroring source structure
- 90% coverage threshold enforced (statements, branches, functions, lines)
- E2E evidence screenshots saved to `e2e/evidence/`
- Use `data-testid` attributes for test selectors

## Conventions

- Functional components only (no class components)
- Custom hooks for all data fetching and state logic
- CSS file per component (no CSS-in-JS)
- `WeatherCondition` enum string values must match backend JSON serialization (camelCase)

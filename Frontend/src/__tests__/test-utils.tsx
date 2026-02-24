import type { ReactNode } from "react";
import { WeatherContext, type WeatherState } from "../context/WeatherContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { WeatherCondition, type DailyForecast, type LocationInfo, type WeatherResponse } from "../types/weather";

export const mockLocation: LocationInfo = {
  id: "phoenix-az",
  city: "Phoenix",
  state: "AZ",
  country: "US",
  latitude: 33.45,
  longitude: -112.07,
};

export const mockLocation2: LocationInfo = {
  id: "seattle-wa",
  city: "Seattle",
  state: "WA",
  country: "US",
  latitude: 47.61,
  longitude: -122.33,
};

export function makeForecast(overrides: Partial<DailyForecast> = {}): DailyForecast {
  return {
    date: "2026-02-24",
    highTempF: 85,
    lowTempF: 65,
    highTempC: 29.4,
    lowTempC: 18.3,
    humidityPercent: 50,
    precipitationChancePercent: 30,
    condition: WeatherCondition.Sunny,
    conditionDescription: "Clear skies",
    ...overrides,
  };
}

export function makeWeatherResponse(overrides: Partial<WeatherResponse> = {}): WeatherResponse {
  const today = makeForecast();
  return {
    location: mockLocation,
    today,
    weeklyForecast: Array.from({ length: 7 }, (_, i) =>
      makeForecast({ date: `2026-02-${24 + i}` })
    ),
    monthlyForecast: Array.from({ length: 30 }, (_, i) =>
      makeForecast({ date: `2026-${i < 6 ? "02" : "03"}-${i < 6 ? 24 + i : i - 5}` })
    ),
    ...overrides,
  };
}

export const defaultWeatherState: WeatherState = {
  currentLocation: mockLocation,
  forecast: makeWeatherResponse(),
  locations: [mockLocation, mockLocation2],
  searchResults: [mockLocation, mockLocation2],
  loading: false,
  error: null,
  setLocation: () => {},
  searchLocations: () => {},
};

export function TestProviders({
  children,
  weatherState = defaultWeatherState,
}: {
  children: ReactNode;
  weatherState?: WeatherState;
}) {
  return (
    <WeatherContext.Provider value={weatherState}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </WeatherContext.Provider>
  );
}

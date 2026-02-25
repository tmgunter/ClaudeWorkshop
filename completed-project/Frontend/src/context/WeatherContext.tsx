import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { LocationInfo, WeatherResponse } from "../types/weather";
import { weatherApi } from "../services/weatherApi";

export interface WeatherState {
  currentLocation: LocationInfo | null;
  forecast: WeatherResponse | null;
  locations: LocationInfo[];
  searchResults: LocationInfo[];
  loading: boolean;
  error: string | null;
  setLocation: (id: string) => void;
  searchLocations: (query: string) => void;
}

const defaultState = {
  currentLocation: null,
  forecast: null,
  locations: [],
  searchResults: [],
  loading: false,
  error: null,
} as WeatherState;

export const WeatherContext = createContext<WeatherState>(defaultState);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<LocationInfo | null>(
    null
  );
  const [forecast, setForecast] = useState<WeatherResponse | null>(null);
  const [locations, setLocations] = useState<LocationInfo[]>([]);
  const [searchResults, setSearchResults] = useState<LocationInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    weatherApi
      .getAllLocations()
      .then((locs) => {
        setLocations(locs);
        setSearchResults(locs);
        if (locs.length > 0) {
          setCurrentLocation(locs[0]);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!currentLocation) return;
    setLoading(true);
    setError(null);
    weatherApi
      .getFullForecast(currentLocation.id)
      .then((data) => {
        setForecast(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentLocation]);

  const setLocation = useCallback(
    (id: string) => {
      const loc = locations.find((l) => l.id === id);
      if (loc) setCurrentLocation(loc);
    },
    [locations]
  );

  const searchLocations = useCallback((query: string) => {
    if (!query.trim()) {
      weatherApi
        .getAllLocations()
        .then(setSearchResults)
        .catch(() => {});
      return;
    }
    weatherApi
      .searchLocations(query)
      .then(setSearchResults)
      .catch(() => {});
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        currentLocation,
        forecast,
        locations,
        searchResults,
        loading,
        error,
        setLocation,
        searchLocations,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

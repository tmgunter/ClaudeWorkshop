import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { LocationInfo, TemperatureUnit } from "../types/weather";

export interface FavoritesState {
  favorites: LocationInfo[];
  temperatureUnit: TemperatureUnit;
  addFavorite: (location: LocationInfo) => void;
  removeFavorite: (locationId: string) => void;
  isFavorite: (locationId: string) => boolean;
  toggleTemperatureUnit: () => void;
}

const defaultState = {
  favorites: [],
  temperatureUnit: "F" as TemperatureUnit,
} as FavoritesState;

export const FavoritesContext = createContext<FavoritesState>(defaultState);

const FAVORITES_KEY = "weatherapp-favorites";
const TEMP_UNIT_KEY = "weatherapp-temp-unit";

function loadFavorites(): LocationInfo[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function loadTempUnit(): TemperatureUnit {
  try {
    const stored = localStorage.getItem(TEMP_UNIT_KEY);
    return stored === "C" ? "C" : "F";
  } catch {
    return "F";
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<LocationInfo[]>(loadFavorites);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(loadTempUnit);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(TEMP_UNIT_KEY, temperatureUnit);
  }, [temperatureUnit]);

  const addFavorite = useCallback((location: LocationInfo) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === location.id)) return prev;
      return [...prev, location];
    });
  }, []);

  const removeFavorite = useCallback((locationId: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== locationId));
  }, []);

  const isFavorite = useCallback(
    (locationId: string) => favorites.some((f) => f.id === locationId),
    [favorites]
  );

  const toggleTemperatureUnit = useCallback(() => {
    setTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, temperatureUnit, addFavorite, removeFavorite, isFavorite, toggleTemperatureUnit }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

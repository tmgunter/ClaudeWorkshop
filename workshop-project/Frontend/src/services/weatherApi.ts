import type { LocationInfo, WeatherResponse } from "../types/weather";

const API_BASE = "http://localhost:5000/api/weather";

export const weatherApi = {
  getAllLocations: async (): Promise<LocationInfo[]> => {
    const res = await fetch(`${API_BASE}/locations`);
    if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
    return res.json();
  },

  searchLocations: async (query: string): Promise<LocationInfo[]> => {
    const res = await fetch(
      `${API_BASE}/locations/search?q=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error(`Failed to search locations: ${res.status}`);
    return res.json();
  },

  getFullForecast: async (locationId: string): Promise<WeatherResponse> => {
    const res = await fetch(`${API_BASE}/forecast/${locationId}`);
    if (!res.ok) throw new Error(`Failed to fetch forecast: ${res.status}`);
    return res.json();
  },
};

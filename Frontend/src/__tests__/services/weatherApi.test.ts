import { describe, it, expect, vi, beforeEach } from "vitest";
import { weatherApi } from "../../services/weatherApi";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("weatherApi", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("getAllLocations", () => {
    it("fetches from correct URL and returns data", async () => {
      const data = [{ id: "phoenix-az", city: "Phoenix" }];
      mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(data) });

      const result = await weatherApi.getAllLocations();

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:5000/api/weather/locations");
      expect(result).toEqual(data);
    });

    it("throws on non-ok response", async () => {
      mockFetch.mockResolvedValue({ ok: false, status: 500 });

      await expect(weatherApi.getAllLocations()).rejects.toThrow("Failed to fetch locations: 500");
    });
  });

  describe("searchLocations", () => {
    it("fetches with encoded query", async () => {
      const data = [{ id: "phoenix-az" }];
      mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(data) });

      const result = await weatherApi.searchLocations("New York");

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/weather/locations/search?q=New%20York"
      );
      expect(result).toEqual(data);
    });

    it("throws on non-ok response", async () => {
      mockFetch.mockResolvedValue({ ok: false, status: 404 });

      await expect(weatherApi.searchLocations("test")).rejects.toThrow("Failed to search locations: 404");
    });
  });

  describe("getFullForecast", () => {
    it("fetches forecast for location", async () => {
      const data = { location: { id: "phoenix-az" }, today: {} };
      mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(data) });

      const result = await weatherApi.getFullForecast("phoenix-az");

      expect(mockFetch).toHaveBeenCalledWith("http://localhost:5000/api/weather/forecast/phoenix-az");
      expect(result).toEqual(data);
    });

    it("throws on non-ok response", async () => {
      mockFetch.mockResolvedValue({ ok: false, status: 404 });

      await expect(weatherApi.getFullForecast("unknown")).rejects.toThrow("Failed to fetch forecast: 404");
    });
  });
});

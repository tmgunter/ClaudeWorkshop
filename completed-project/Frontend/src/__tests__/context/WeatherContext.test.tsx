import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WeatherProvider } from "../../context/WeatherContext";
import { useWeather } from "../../hooks/useWeather";
import { mockLocation, mockLocation2, makeWeatherResponse } from "../test-utils";
import { weatherApi } from "../../services/weatherApi";

vi.mock("../../services/weatherApi", () => ({
  weatherApi: {
    getAllLocations: vi.fn(),
    searchLocations: vi.fn(),
    getFullForecast: vi.fn(),
  },
}));

const mockedApi = vi.mocked(weatherApi);

function TestConsumer() {
  const { currentLocation, forecast, locations, searchResults, loading, error, setLocation, searchLocations } =
    useWeather();
  return (
    <div>
      <span data-testid="location">{currentLocation?.city ?? "none"}</span>
      <span data-testid="forecast">{forecast ? "loaded" : "empty"}</span>
      <span data-testid="loc-count">{locations.length}</span>
      <span data-testid="search-count">{searchResults.length}</span>
      <span data-testid="loading">{loading ? "yes" : "no"}</span>
      <span data-testid="error">{error ?? "none"}</span>
      <button data-testid="set-loc" onClick={() => setLocation("seattle-wa")}>Set</button>
      <button data-testid="search" onClick={() => searchLocations("Sea")}>Search</button>
      <button data-testid="search-empty" onClick={() => searchLocations("")}>SearchEmpty</button>
    </div>
  );
}

describe("WeatherContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads locations on mount and selects first", async () => {
    const allLocs = [mockLocation, mockLocation2];
    mockedApi.getAllLocations.mockResolvedValue(allLocs);
    mockedApi.getFullForecast.mockResolvedValue(makeWeatherResponse());

    render(
      <WeatherProvider><TestConsumer /></WeatherProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe("Phoenix");
    });
    await waitFor(() => {
      expect(screen.getByTestId("forecast").textContent).toBe("loaded");
    });
  });

  it("handles location load error", async () => {
    mockedApi.getAllLocations.mockRejectedValue(new Error("Network error"));

    render(
      <WeatherProvider><TestConsumer /></WeatherProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error").textContent).toBe("Network error");
    });
  });

  it("handles forecast load error", async () => {
    mockedApi.getAllLocations.mockResolvedValue([mockLocation]);
    mockedApi.getFullForecast.mockRejectedValue(new Error("Forecast error"));

    render(
      <WeatherProvider><TestConsumer /></WeatherProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error").textContent).toBe("Forecast error");
    });
  });

  it("changes location when setLocation is called", async () => {
    const user = userEvent.setup();
    mockedApi.getAllLocations.mockResolvedValue([mockLocation, mockLocation2]);
    mockedApi.getFullForecast.mockResolvedValue(makeWeatherResponse());

    render(
      <WeatherProvider><TestConsumer /></WeatherProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe("Phoenix");
    });

    mockedApi.getFullForecast.mockResolvedValue(
      makeWeatherResponse({ location: mockLocation2 })
    );
    await user.click(screen.getByTestId("set-loc"));

    await waitFor(() => {
      expect(screen.getByTestId("location").textContent).toBe("Seattle");
    });
  });

  it("searches locations", async () => {
    const user = userEvent.setup();
    mockedApi.getAllLocations.mockResolvedValue([mockLocation, mockLocation2]);
    mockedApi.getFullForecast.mockResolvedValue(makeWeatherResponse());
    mockedApi.searchLocations.mockResolvedValue([mockLocation2]);

    render(
      <WeatherProvider><TestConsumer /></WeatherProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loc-count").textContent).toBe("2");
    });

    await user.click(screen.getByTestId("search"));

    await waitFor(() => {
      expect(screen.getByTestId("search-count").textContent).toBe("1");
    });
  });

  it("resets search on empty query", async () => {
    const user = userEvent.setup();
    mockedApi.getAllLocations.mockResolvedValue([mockLocation, mockLocation2]);
    mockedApi.getFullForecast.mockResolvedValue(makeWeatherResponse());

    render(
      <WeatherProvider><TestConsumer /></WeatherProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loc-count").textContent).toBe("2");
    });

    await user.click(screen.getByTestId("search-empty"));

    await waitFor(() => {
      expect(mockedApi.getAllLocations).toHaveBeenCalledTimes(2);
    });
  });
});

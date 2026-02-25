import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Favorites } from "../../components/Favorites/Favorites";
import { TestProviders, defaultWeatherState, mockLocation, mockLocation2 } from "../test-utils";
import { FavoritesContext, type FavoritesState } from "../../context/FavoritesContext";
import { WeatherContext } from "../../context/WeatherContext";
import type { ReactNode } from "react";

function renderWithFavorites(favorites: FavoritesState["favorites"] = [], overrides: Partial<FavoritesState> = {}) {
  const favState: FavoritesState = {
    favorites,
    temperatureUnit: "F",
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    isFavorite: (id) => favorites.some((f) => f.id === id),
    toggleTemperatureUnit: vi.fn(),
    ...overrides,
  };
  return {
    ...render(
      <WeatherContext.Provider value={defaultWeatherState}>
        <FavoritesContext.Provider value={favState}>
          <Favorites />
        </FavoritesContext.Provider>
      </WeatherContext.Provider>
    ),
    favState,
  };
}

describe("Favorites", () => {
  it("renders favorites toggle button", () => {
    renderWithFavorites();
    expect(screen.getByTestId("favorites-toggle")).toBeInTheDocument();
  });

  it("shows empty star when not a favorite", () => {
    renderWithFavorites();
    expect(screen.getByTestId("favorites-toggle").textContent).toBe("☆");
  });

  it("shows filled star when location is a favorite", () => {
    renderWithFavorites([mockLocation]);
    expect(screen.getByTestId("favorites-toggle").textContent).toBe("★");
  });

  it("renders favorite chips", () => {
    renderWithFavorites([mockLocation, mockLocation2]);
    expect(screen.getByText("Phoenix, AZ")).toBeInTheDocument();
    expect(screen.getByText("Seattle, WA")).toBeInTheDocument();
  });

  it("calls addFavorite when star clicked (not a favorite)", async () => {
    const user = userEvent.setup();
    const addFavorite = vi.fn();
    renderWithFavorites([], { addFavorite });
    await user.click(screen.getByTestId("favorites-toggle"));
    expect(addFavorite).toHaveBeenCalledWith(mockLocation);
  });

  it("calls removeFavorite when star clicked (is a favorite)", async () => {
    const user = userEvent.setup();
    const removeFavorite = vi.fn();
    renderWithFavorites([mockLocation], { removeFavorite });
    await user.click(screen.getByTestId("favorites-toggle"));
    expect(removeFavorite).toHaveBeenCalledWith("phoenix-az");
  });

  it("calls setLocation when favorite chip clicked", async () => {
    const user = userEvent.setup();
    const setLocation = vi.fn();
    const weatherState = { ...defaultWeatherState, setLocation };
    render(
      <WeatherContext.Provider value={weatherState}>
        <FavoritesContext.Provider
          value={{
            favorites: [mockLocation2],
            temperatureUnit: "F",
            addFavorite: vi.fn(),
            removeFavorite: vi.fn(),
            isFavorite: () => false,
            toggleTemperatureUnit: vi.fn(),
          }}
        >
          <Favorites />
        </FavoritesContext.Provider>
      </WeatherContext.Provider>
    );
    await user.click(screen.getByText("Seattle, WA"));
    expect(setLocation).toHaveBeenCalledWith("seattle-wa");
  });
});

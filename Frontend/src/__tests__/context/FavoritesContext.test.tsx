import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoritesProvider } from "../../context/FavoritesContext";
import { useFavorites } from "../../hooks/useFavorites";
import { mockLocation, mockLocation2 } from "../test-utils";

function TestConsumer() {
  const { favorites, temperatureUnit, addFavorite, removeFavorite, isFavorite, toggleTemperatureUnit } =
    useFavorites();
  return (
    <div>
      <span data-testid="unit">{temperatureUnit}</span>
      <span data-testid="count">{favorites.length}</span>
      <span data-testid="is-fav">{isFavorite(mockLocation.id) ? "yes" : "no"}</span>
      <button data-testid="add" onClick={() => addFavorite(mockLocation)}>Add</button>
      <button data-testid="add2" onClick={() => addFavorite(mockLocation2)}>Add2</button>
      <button data-testid="remove" onClick={() => removeFavorite(mockLocation.id)}>Remove</button>
      <button data-testid="toggle" onClick={toggleTemperatureUnit}>Toggle</button>
    </div>
  );
}

describe("FavoritesContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to Fahrenheit", () => {
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    expect(screen.getByTestId("unit").textContent).toBe("F");
  });

  it("starts with no favorites", () => {
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("adds a favorite", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    await user.click(screen.getByTestId("add"));
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByTestId("is-fav").textContent).toBe("yes");
  });

  it("does not add duplicate favorites", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    await user.click(screen.getByTestId("add"));
    await user.click(screen.getByTestId("add"));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("removes a favorite", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    await user.click(screen.getByTestId("add"));
    await user.click(screen.getByTestId("remove"));
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("is-fav").textContent).toBe("no");
  });

  it("toggles temperature unit", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    expect(screen.getByTestId("unit").textContent).toBe("F");
    await user.click(screen.getByTestId("toggle"));
    expect(screen.getByTestId("unit").textContent).toBe("C");
    await user.click(screen.getByTestId("toggle"));
    expect(screen.getByTestId("unit").textContent).toBe("F");
  });

  it("persists favorites to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    await user.click(screen.getByTestId("add"));
    const stored = JSON.parse(localStorage.getItem("weatherapp-favorites")!);
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe("phoenix-az");
  });

  it("persists temp unit to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    await user.click(screen.getByTestId("toggle"));
    expect(localStorage.getItem("weatherapp-temp-unit")).toBe("C");
  });

  it("loads favorites from localStorage", () => {
    localStorage.setItem(
      "weatherapp-favorites",
      JSON.stringify([mockLocation])
    );
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("loads temp unit from localStorage", () => {
    localStorage.setItem("weatherapp-temp-unit", "C");
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    expect(screen.getByTestId("unit").textContent).toBe("C");
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("weatherapp-favorites", "not-json");
    render(
      <FavoritesProvider><TestConsumer /></FavoritesProvider>
    );
    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});

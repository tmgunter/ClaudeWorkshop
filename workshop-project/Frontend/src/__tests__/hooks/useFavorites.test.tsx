import { describe, it, expect, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFavorites } from "../../hooks/useFavorites";
import { FavoritesProvider } from "../../context/FavoritesContext";
import type { ReactNode } from "react";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns favorites context values", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FavoritesProvider>{children}</FavoritesProvider>
    );
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.temperatureUnit).toBe("F");
    expect(typeof result.current.addFavorite).toBe("function");
    expect(typeof result.current.removeFavorite).toBe("function");
    expect(typeof result.current.isFavorite).toBe("function");
    expect(typeof result.current.toggleTemperatureUnit).toBe("function");
  });
});

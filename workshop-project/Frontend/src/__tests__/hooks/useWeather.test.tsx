import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWeather } from "../../hooks/useWeather";
import { TestProviders, defaultWeatherState } from "../test-utils";
import type { ReactNode } from "react";

describe("useWeather", () => {
  it("returns weather context values", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <TestProviders>{children}</TestProviders>
    );
    const { result } = renderHook(() => useWeather(), { wrapper });

    expect(result.current.currentLocation).toEqual(defaultWeatherState.currentLocation);
    expect(result.current.forecast).toBeDefined();
    expect(result.current.locations).toHaveLength(2);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});

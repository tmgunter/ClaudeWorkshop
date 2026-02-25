import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WeeklyForecast } from "../../components/WeeklyForecast/WeeklyForecast";
import { TestProviders, defaultWeatherState } from "../test-utils";

describe("WeeklyForecast", () => {
  it("renders the 7-day forecast section", () => {
    render(
      <TestProviders>
        <WeeklyForecast />
      </TestProviders>
    );
    expect(screen.getByTestId("weekly-forecast")).toBeInTheDocument();
    expect(screen.getByText("7-Day Forecast")).toBeInTheDocument();
  });

  it("renders 7 day cards", () => {
    render(
      <TestProviders>
        <WeeklyForecast />
      </TestProviders>
    );
    const cards = screen.getAllByTestId("day-card");
    expect(cards).toHaveLength(7);
  });

  it("renders nothing when no forecast", () => {
    render(
      <TestProviders weatherState={{ ...defaultWeatherState, forecast: null }}>
        <WeeklyForecast />
      </TestProviders>
    );
    expect(screen.queryByTestId("weekly-forecast")).not.toBeInTheDocument();
  });
});

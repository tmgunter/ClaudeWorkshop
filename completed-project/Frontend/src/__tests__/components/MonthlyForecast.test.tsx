import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MonthlyForecast } from "../../components/MonthlyForecast/MonthlyForecast";
import { TestProviders, defaultWeatherState } from "../test-utils";

describe("MonthlyForecast", () => {
  it("renders the 30-day forecast section", () => {
    render(
      <TestProviders>
        <MonthlyForecast />
      </TestProviders>
    );
    expect(screen.getByTestId("monthly-forecast")).toBeInTheDocument();
    expect(screen.getByText("30-Day Forecast")).toBeInTheDocument();
  });

  it("renders 30 day cards", () => {
    render(
      <TestProviders>
        <MonthlyForecast />
      </TestProviders>
    );
    const cards = screen.getAllByTestId("day-card");
    expect(cards).toHaveLength(30);
  });

  it("renders nothing when no forecast", () => {
    render(
      <TestProviders weatherState={{ ...defaultWeatherState, forecast: null }}>
        <MonthlyForecast />
      </TestProviders>
    );
    expect(screen.queryByTestId("monthly-forecast")).not.toBeInTheDocument();
  });
});

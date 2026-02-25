import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodayForecast } from "../../components/TodayForecast/TodayForecast";
import { TestProviders, defaultWeatherState } from "../test-utils";

describe("TodayForecast", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("renders today's forecast data", () => {
    render(
      <TestProviders>
        <TodayForecast />
      </TestProviders>
    );
    expect(screen.getByTestId("today-forecast")).toBeInTheDocument();
    expect(screen.getByText("Phoenix, AZ")).toBeInTheDocument();
  });

  it("renders temperature", () => {
    render(
      <TestProviders>
        <TodayForecast />
      </TestProviders>
    );
    const temps = screen.getAllByText("85°F");
    expect(temps.length).toBeGreaterThanOrEqual(1);
  });

  it("renders weather description", () => {
    render(
      <TestProviders>
        <TodayForecast />
      </TestProviders>
    );
    expect(screen.getByText("Clear skies")).toBeInTheDocument();
  });

  it("renders humidity and precipitation", () => {
    render(
      <TestProviders>
        <TodayForecast />
      </TestProviders>
    );
    const section = screen.getByTestId("today-forecast");
    expect(section.textContent).toContain("50%");
    expect(section.textContent).toContain("30%");
  });

  it("renders large weather icon", () => {
    render(
      <TestProviders>
        <TodayForecast />
      </TestProviders>
    );
    const icon = screen.getByTestId("weather-icon");
    expect(icon.className).toContain("weather-icon--large");
  });

  it("shows loading state", () => {
    render(
      <TestProviders weatherState={{ ...defaultWeatherState, loading: true }}>
        <TodayForecast />
      </TestProviders>
    );
    expect(screen.getByTestId("today-loading")).toBeInTheDocument();
  });

  it("renders nothing when no forecast", () => {
    render(
      <TestProviders weatherState={{ ...defaultWeatherState, forecast: null }}>
        <TodayForecast />
      </TestProviders>
    );
    expect(screen.queryByTestId("today-forecast")).not.toBeInTheDocument();
  });

  it("renders temperature in Celsius when unit is C", () => {
    localStorage.setItem("weatherapp-temp-unit", "C");
    render(
      <TestProviders>
        <TodayForecast />
      </TestProviders>
    );
    const section = screen.getByTestId("today-forecast");
    expect(section.textContent).toContain("29°C");
  });
});

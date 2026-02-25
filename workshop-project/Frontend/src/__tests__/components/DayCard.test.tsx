import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { DayCard } from "../../components/DayCard/DayCard";
import { FavoritesProvider } from "../../context/FavoritesContext";
import { WeatherCondition, type DailyForecast } from "../../types/weather";

const mockForecast: DailyForecast = {
  date: "2026-02-24",
  highTempF: 85,
  lowTempF: 65,
  highTempC: 29.4,
  lowTempC: 18.3,
  humidityPercent: 50,
  precipitationChancePercent: 30,
  condition: WeatherCondition.Sunny,
  conditionDescription: "Clear skies",
};

function renderWithProvider(forecast = mockForecast) {
  return render(
    <FavoritesProvider>
      <DayCard forecast={forecast} />
    </FavoritesProvider>
  );
}

describe("DayCard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders date", () => {
    renderWithProvider();
    const card = screen.getByTestId("day-card");
    expect(card.textContent).toContain("Feb");
    expect(card.textContent).toContain("24");
  });

  it("renders temperature in Fahrenheit by default", () => {
    renderWithProvider();
    const card = screen.getByTestId("day-card");
    expect(card.textContent).toContain("85");
    expect(card.textContent).toContain("65");
  });

  it("renders humidity", () => {
    renderWithProvider();
    expect(screen.getByTestId("day-card").textContent).toContain("50%");
  });

  it("renders precipitation chance", () => {
    renderWithProvider();
    expect(screen.getByTestId("day-card").textContent).toContain("30%");
  });

  it("renders weather icon", () => {
    renderWithProvider();
    expect(screen.getByTestId("weather-icon")).toBeInTheDocument();
  });

  it("renders temperature in Celsius when unit is C", () => {
    localStorage.setItem("weatherapp-temp-unit", "C");
    renderWithProvider();
    const card = screen.getByTestId("day-card");
    expect(card.textContent).toContain("29");
    expect(card.textContent).toContain("18");
  });
});

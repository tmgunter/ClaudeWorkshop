import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WeatherIcon } from "../../components/WeatherIcon/WeatherIcon";
import { WeatherCondition } from "../../types/weather";

describe("WeatherIcon", () => {
  it("renders with correct aria-label for Sunny", () => {
    render(<WeatherIcon condition={WeatherCondition.Sunny} />);
    expect(screen.getByLabelText("Sunny")).toBeInTheDocument();
  });

  it("renders with correct aria-label for Rain", () => {
    render(<WeatherIcon condition={WeatherCondition.Rain} />);
    expect(screen.getByLabelText("Rain")).toBeInTheDocument();
  });

  it("renders with correct aria-label for Snow", () => {
    render(<WeatherIcon condition={WeatherCondition.Snow} />);
    expect(screen.getByLabelText("Snow")).toBeInTheDocument();
  });

  it("renders with correct aria-label for Thunderstorm", () => {
    render(<WeatherIcon condition={WeatherCondition.Thunderstorm} />);
    expect(screen.getByLabelText("Thunderstorm")).toBeInTheDocument();
  });

  it("renders with correct aria-label for Cloudy", () => {
    render(<WeatherIcon condition={WeatherCondition.Cloudy} />);
    expect(screen.getByLabelText("Cloudy")).toBeInTheDocument();
  });

  it("renders with correct aria-label for PartlyCloudy", () => {
    render(<WeatherIcon condition={WeatherCondition.PartlyCloudy} />);
    expect(screen.getByLabelText("Partly Cloudy")).toBeInTheDocument();
  });

  it("renders with correct aria-label for Fog", () => {
    render(<WeatherIcon condition={WeatherCondition.Fog} />);
    expect(screen.getByLabelText("Fog")).toBeInTheDocument();
  });

  it("renders with correct aria-label for Windy", () => {
    render(<WeatherIcon condition={WeatherCondition.Windy} />);
    expect(screen.getByLabelText("Windy")).toBeInTheDocument();
  });

  it("applies small size class", () => {
    render(<WeatherIcon condition={WeatherCondition.Sunny} size="small" />);
    const icon = screen.getByTestId("weather-icon");
    expect(icon.className).toContain("weather-icon--small");
  });

  it("applies large size class", () => {
    render(<WeatherIcon condition={WeatherCondition.Sunny} size="large" />);
    const icon = screen.getByTestId("weather-icon");
    expect(icon.className).toContain("weather-icon--large");
  });

  it("defaults to medium size class", () => {
    render(<WeatherIcon condition={WeatherCondition.Sunny} />);
    const icon = screen.getByTestId("weather-icon");
    expect(icon.className).toContain("weather-icon--medium");
  });

  it("applies condition class", () => {
    render(<WeatherIcon condition={WeatherCondition.Rain} />);
    const icon = screen.getByTestId("weather-icon");
    expect(icon.className).toContain("weather-icon--rain");
  });
});

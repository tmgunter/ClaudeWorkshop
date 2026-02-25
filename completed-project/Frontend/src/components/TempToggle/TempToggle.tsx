import { useFavorites } from "../../hooks/useFavorites";
import "./TempToggle.css";

export function TempToggle() {
  const { temperatureUnit, toggleTemperatureUnit } = useFavorites();

  return (
    <button
      className="temp-toggle"
      onClick={toggleTemperatureUnit}
      aria-label={`Switch to ${temperatureUnit === "F" ? "Celsius" : "Fahrenheit"}`}
      data-testid="temp-toggle"
    >
      <span className={`temp-toggle__option ${temperatureUnit === "F" ? "temp-toggle__option--active" : ""}`}>
        °F
      </span>
      <span className="temp-toggle__separator">/</span>
      <span className={`temp-toggle__option ${temperatureUnit === "C" ? "temp-toggle__option--active" : ""}`}>
        °C
      </span>
    </button>
  );
}

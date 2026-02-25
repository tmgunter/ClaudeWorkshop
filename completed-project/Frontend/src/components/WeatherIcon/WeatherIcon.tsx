import { WeatherCondition } from "../../types/weather";
import "./WeatherIcon.css";

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: "small" | "medium" | "large";
}

const iconMap: Record<WeatherCondition, { emoji: string; label: string }> = {
  [WeatherCondition.Sunny]: { emoji: "\u2600\uFE0F", label: "Sunny" },
  [WeatherCondition.PartlyCloudy]: { emoji: "\u26C5", label: "Partly Cloudy" },
  [WeatherCondition.Cloudy]: { emoji: "\u2601\uFE0F", label: "Cloudy" },
  [WeatherCondition.Rain]: { emoji: "\uD83C\uDF27\uFE0F", label: "Rain" },
  [WeatherCondition.Thunderstorm]: { emoji: "\u26C8\uFE0F", label: "Thunderstorm" },
  [WeatherCondition.Snow]: { emoji: "\uD83C\uDF28\uFE0F", label: "Snow" },
  [WeatherCondition.Fog]: { emoji: "\uD83C\uDF2B\uFE0F", label: "Fog" },
  [WeatherCondition.Windy]: { emoji: "\uD83D\uDCA8", label: "Windy" },
};

export function WeatherIcon({ condition, size = "medium" }: WeatherIconProps) {
  const icon = iconMap[condition] ?? { emoji: "\u2753", label: "Unknown" };

  return (
    <span
      className={`weather-icon weather-icon--${size} weather-icon--${condition.toLowerCase()}`}
      role="img"
      aria-label={icon.label}
      data-testid="weather-icon"
    >
      {icon.emoji}
    </span>
  );
}

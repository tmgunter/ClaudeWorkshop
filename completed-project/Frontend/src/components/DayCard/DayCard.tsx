import type { DailyForecast } from "../../types/weather";
import { useFavorites } from "../../hooks/useFavorites";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";
import "./DayCard.css";

interface DayCardProps {
  forecast: DailyForecast;
}

function formatDay(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function DayCard({ forecast }: DayCardProps) {
  const { temperatureUnit } = useFavorites();
  const high = temperatureUnit === "F" ? forecast.highTempF : forecast.highTempC;
  const low = temperatureUnit === "F" ? forecast.lowTempF : forecast.lowTempC;

  return (
    <div className="day-card" data-testid="day-card">
      <div className="day-card__date">{formatDay(forecast.date)}</div>
      <WeatherIcon condition={forecast.condition} size="small" />
      <div className="day-card__temps">
        <span className="day-card__high">{Math.round(high)}°</span>
        <span className="day-card__low">{Math.round(low)}°</span>
      </div>
      <div className="day-card__details">
        <span className="day-card__humidity" title="Humidity">
          💧 {forecast.humidityPercent}%
        </span>
        <span className="day-card__precip" title="Precipitation chance">
          🌧 {forecast.precipitationChancePercent}%
        </span>
      </div>
    </div>
  );
}

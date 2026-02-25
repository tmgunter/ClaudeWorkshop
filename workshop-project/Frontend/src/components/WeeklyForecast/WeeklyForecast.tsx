import { useWeather } from "../../hooks/useWeather";
import { DayCard } from "../DayCard/DayCard";
import "./WeeklyForecast.css";

export function WeeklyForecast() {
  const { forecast } = useWeather();

  if (!forecast) return null;

  return (
    <section className="weekly-forecast" data-testid="weekly-forecast">
      <h2 className="weekly-forecast__title">7-Day Forecast</h2>
      <div className="weekly-forecast__grid">
        {forecast.weeklyForecast.map((day) => (
          <DayCard key={day.date} forecast={day} />
        ))}
      </div>
    </section>
  );
}

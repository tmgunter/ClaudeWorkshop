import { useWeather } from "../../hooks/useWeather";
import { DayCard } from "../DayCard/DayCard";
import "./MonthlyForecast.css";

export function MonthlyForecast() {
  const { forecast } = useWeather();

  if (!forecast) return null;

  return (
    <section className="monthly-forecast" data-testid="monthly-forecast">
      <h2 className="monthly-forecast__title">30-Day Forecast</h2>
      <div className="monthly-forecast__grid">
        {forecast.monthlyForecast.map((day) => (
          <DayCard key={day.date} forecast={day} />
        ))}
      </div>
    </section>
  );
}

import { useWeather } from "../../hooks/useWeather";
import { useFavorites } from "../../hooks/useFavorites";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";
import "./TodayForecast.css";

export function TodayForecast() {
  const { forecast, loading } = useWeather();
  const { temperatureUnit } = useFavorites();

  if (loading) {
    return <div className="today-forecast today-forecast--loading" data-testid="today-loading">Loading...</div>;
  }

  if (!forecast) {
    return null;
  }

  const { today } = forecast;
  const high = temperatureUnit === "F" ? today.highTempF : today.highTempC;
  const low = temperatureUnit === "F" ? today.lowTempF : today.lowTempC;

  return (
    <section className="today-forecast" data-testid="today-forecast">
      <div className="today-forecast__main">
        <WeatherIcon condition={today.condition} size="large" />
        <div className="today-forecast__info">
          <div className="today-forecast__location">
            {forecast.location.city}, {forecast.location.state}
          </div>
          <div className="today-forecast__temp">
            {Math.round(high)}°{temperatureUnit}
          </div>
          <div className="today-forecast__description">
            {today.conditionDescription}
          </div>
        </div>
      </div>
      <div className="today-forecast__details">
        <div className="today-forecast__detail">
          <span className="today-forecast__detail-label">High</span>
          <span className="today-forecast__detail-value">{Math.round(high)}°{temperatureUnit}</span>
        </div>
        <div className="today-forecast__detail">
          <span className="today-forecast__detail-label">Low</span>
          <span className="today-forecast__detail-value">{Math.round(low)}°{temperatureUnit}</span>
        </div>
        <div className="today-forecast__detail">
          <span className="today-forecast__detail-label">Humidity</span>
          <span className="today-forecast__detail-value">{today.humidityPercent}%</span>
        </div>
        <div className="today-forecast__detail">
          <span className="today-forecast__detail-label">Precipitation</span>
          <span className="today-forecast__detail-value">{today.precipitationChancePercent}%</span>
        </div>
      </div>
    </section>
  );
}

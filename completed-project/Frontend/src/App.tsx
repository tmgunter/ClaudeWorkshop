import { Header } from "./components/Header/Header";
import { TodayForecast } from "./components/TodayForecast/TodayForecast";
import { WeeklyForecast } from "./components/WeeklyForecast/WeeklyForecast";
import { MonthlyForecast } from "./components/MonthlyForecast/MonthlyForecast";
import { useWeather } from "./hooks/useWeather";
import "./App.css";

function App() {
  const { error } = useWeather();

  return (
    <div className="app" data-testid="app">
      <Header />
      <main className="app__content">
        {error && (
          <div className="app__error" data-testid="app-error">
            Unable to load weather data. Please try again later.
          </div>
        )}
        <TodayForecast />
        <WeeklyForecast />
        <MonthlyForecast />
      </main>
    </div>
  );
}

export default App;

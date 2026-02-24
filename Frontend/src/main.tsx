import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WeatherProvider } from "./context/WeatherContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WeatherProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </WeatherProvider>
  </StrictMode>
);

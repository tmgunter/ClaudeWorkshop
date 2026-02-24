import { useFavorites } from "../../hooks/useFavorites";
import { useWeather } from "../../hooks/useWeather";
import "./Favorites.css";

export function Favorites() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { currentLocation, setLocation } = useWeather();

  return (
    <div className="favorites" data-testid="favorites">
      {currentLocation && (
        <button
          className="favorites__add-btn"
          onClick={() =>
            isFavorite(currentLocation.id)
              ? removeFavorite(currentLocation.id)
              : addFavorite(currentLocation)
          }
          aria-label={
            isFavorite(currentLocation.id)
              ? "Remove from favorites"
              : "Add to favorites"
          }
          data-testid="favorites-toggle"
        >
          {isFavorite(currentLocation.id) ? "★" : "☆"}
        </button>
      )}
      <div className="favorites__list" data-testid="favorites-list">
        {favorites.map((loc) => (
          <button
            key={loc.id}
            className={`favorites__chip ${
              currentLocation?.id === loc.id ? "favorites__chip--active" : ""
            }`}
            onClick={() => setLocation(loc.id)}
            data-testid={`favorite-${loc.id}`}
          >
            {loc.city}, {loc.state}
          </button>
        ))}
      </div>
    </div>
  );
}

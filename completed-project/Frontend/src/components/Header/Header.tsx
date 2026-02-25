import { LocationSearch } from "../LocationSearch/LocationSearch";
import { Favorites } from "../Favorites/Favorites";
import { TempToggle } from "../TempToggle/TempToggle";
import "./Header.css";

export function Header() {
  return (
    <header className="header" data-testid="header">
      <div className="header__brand">Weather App</div>
      <div className="header__controls">
        <LocationSearch />
        <Favorites />
        <TempToggle />
      </div>
    </header>
  );
}

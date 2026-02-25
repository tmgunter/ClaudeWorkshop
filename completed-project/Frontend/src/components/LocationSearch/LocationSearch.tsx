import { useState, useRef, useEffect } from "react";
import { useWeather } from "../../hooks/useWeather";
import "./LocationSearch.css";

export function LocationSearch() {
  const { searchResults, searchLocations, setLocation } = useWeather();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    searchLocations(value);
    setIsOpen(true);
  };

  const handleSelect = (id: string) => {
    setLocation(id);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="location-search" ref={wrapperRef} data-testid="location-search">
      <input
        type="text"
        className="location-search__input"
        placeholder="Search locations..."
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => { searchLocations(query); setIsOpen(true); }}
        aria-label="Search locations"
        data-testid="location-search-input"
      />
      {isOpen && searchResults.length > 0 && (
        <ul className="location-search__dropdown" data-testid="location-search-dropdown">
          {searchResults.map((loc) => (
            <li key={loc.id}>
              <button
                className="location-search__option"
                onClick={() => handleSelect(loc.id)}
                data-testid={`location-option-${loc.id}`}
              >
                {loc.city}, {loc.state}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

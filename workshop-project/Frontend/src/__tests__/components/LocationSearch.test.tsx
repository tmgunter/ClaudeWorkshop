import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocationSearch } from "../../components/LocationSearch/LocationSearch";
import { TestProviders, defaultWeatherState } from "../test-utils";

describe("LocationSearch", () => {
  it("renders search input", () => {
    render(
      <TestProviders>
        <LocationSearch />
      </TestProviders>
    );
    expect(screen.getByTestId("location-search-input")).toBeInTheDocument();
  });

  it("opens dropdown on focus", () => {
    render(
      <TestProviders>
        <LocationSearch />
      </TestProviders>
    );
    fireEvent.focus(screen.getByTestId("location-search-input"));
    expect(screen.getByTestId("location-search-dropdown")).toBeInTheDocument();
  });

  it("shows search results in dropdown", () => {
    render(
      <TestProviders>
        <LocationSearch />
      </TestProviders>
    );
    fireEvent.focus(screen.getByTestId("location-search-input"));
    expect(screen.getByText("Phoenix, AZ")).toBeInTheDocument();
    expect(screen.getByText("Seattle, WA")).toBeInTheDocument();
  });

  it("calls searchLocations on input change", async () => {
    const user = userEvent.setup();
    const searchLocations = vi.fn();
    render(
      <TestProviders weatherState={{ ...defaultWeatherState, searchLocations }}>
        <LocationSearch />
      </TestProviders>
    );
    await user.type(screen.getByTestId("location-search-input"), "Sea");
    expect(searchLocations).toHaveBeenCalled();
  });

  it("calls setLocation when option clicked", async () => {
    const user = userEvent.setup();
    const setLocation = vi.fn();
    render(
      <TestProviders weatherState={{ ...defaultWeatherState, setLocation }}>
        <LocationSearch />
      </TestProviders>
    );
    fireEvent.focus(screen.getByTestId("location-search-input"));
    await user.click(screen.getByText("Seattle, WA"));
    expect(setLocation).toHaveBeenCalledWith("seattle-wa");
  });

  it("closes dropdown on outside click", () => {
    render(
      <TestProviders>
        <div data-testid="outside">Outside</div>
        <LocationSearch />
      </TestProviders>
    );
    fireEvent.focus(screen.getByTestId("location-search-input"));
    expect(screen.getByTestId("location-search-dropdown")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByTestId("location-search-dropdown")).not.toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TempToggle } from "../../components/TempToggle/TempToggle";
import { FavoritesProvider } from "../../context/FavoritesContext";

function renderWithProvider() {
  return render(
    <FavoritesProvider>
      <TempToggle />
    </FavoritesProvider>
  );
}

describe("TempToggle", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders with F active by default", () => {
    renderWithProvider();
    const toggle = screen.getByTestId("temp-toggle");
    expect(toggle).toBeInTheDocument();
    expect(toggle.textContent).toContain("°F");
    expect(toggle.textContent).toContain("°C");
  });

  it("toggles to C on click", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    const toggle = screen.getByTestId("temp-toggle");
    await user.click(toggle);
    expect(screen.getByLabelText("Switch to Fahrenheit")).toBeInTheDocument();
  });

  it("toggles back to F on double click", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    const toggle = screen.getByTestId("temp-toggle");
    await user.click(toggle);
    await user.click(toggle);
    expect(screen.getByLabelText("Switch to Celsius")).toBeInTheDocument();
  });
});

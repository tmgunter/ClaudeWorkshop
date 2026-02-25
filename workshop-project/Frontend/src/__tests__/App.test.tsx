import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { TestProviders, defaultWeatherState } from "./test-utils";

describe("App", () => {
  it("renders the app", () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>
    );
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });

  it("renders header, today, weekly, and monthly", () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("today-forecast")).toBeInTheDocument();
    expect(screen.getByTestId("weekly-forecast")).toBeInTheDocument();
    expect(screen.getByTestId("monthly-forecast")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    render(
      <TestProviders weatherState={{ ...defaultWeatherState, error: "Something went wrong" }}>
        <App />
      </TestProviders>
    );
    expect(screen.getByTestId("app-error")).toBeInTheDocument();
  });

  it("does not render error when no error", () => {
    render(
      <TestProviders>
        <App />
      </TestProviders>
    );
    expect(screen.queryByTestId("app-error")).not.toBeInTheDocument();
  });
});

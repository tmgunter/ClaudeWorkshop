import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../../components/Header/Header";
import { TestProviders } from "../test-utils";

describe("Header", () => {
  it("renders the header", () => {
    render(
      <TestProviders>
        <Header />
      </TestProviders>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("renders the brand name", () => {
    render(
      <TestProviders>
        <Header />
      </TestProviders>
    );
    expect(screen.getByText("Weather App")).toBeInTheDocument();
  });

  it("renders the location search", () => {
    render(
      <TestProviders>
        <Header />
      </TestProviders>
    );
    expect(screen.getByTestId("location-search")).toBeInTheDocument();
  });

  it("renders the temp toggle", () => {
    render(
      <TestProviders>
        <Header />
      </TestProviders>
    );
    expect(screen.getByTestId("temp-toggle")).toBeInTheDocument();
  });

  it("renders the favorites section", () => {
    render(
      <TestProviders>
        <Header />
      </TestProviders>
    );
    expect(screen.getByTestId("favorites")).toBeInTheDocument();
  });
});

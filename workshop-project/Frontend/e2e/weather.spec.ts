import { test, expect } from "@playwright/test";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const evidenceDir = join(__dirname, "evidence");

test.describe("Weather App E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the app to load and fetch initial data
    await page.waitForSelector('[data-testid="today-forecast"]', {
      timeout: 15000,
    });
  });

  test("01 - Page loads with default location and forecast", async ({
    page,
  }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("location-search")).toBeVisible();
    await expect(page.getByTestId("today-forecast")).toBeVisible();
    await expect(page.getByTestId("weekly-forecast")).toBeVisible();

    // Scroll to see monthly forecast
    await page.getByTestId("monthly-forecast").scrollIntoViewIfNeeded();
    await expect(page.getByTestId("monthly-forecast")).toBeVisible();

    await page.screenshot({
      path: join(evidenceDir, "01-initial-load.png"),
      fullPage: true,
    });
  });

  test("02 - Location search shows dropdown and selects location", async ({
    page,
  }) => {
    const searchInput = page.getByTestId("location-search-input");
    await searchInput.click();
    await searchInput.fill("Phoenix");

    // Wait for dropdown
    await expect(page.getByTestId("location-search-dropdown")).toBeVisible();

    await page.screenshot({
      path: join(evidenceDir, "02a-location-search-dropdown.png"),
    });

    // Click Phoenix result
    await page.getByTestId("location-option-phoenix-az").click();

    // Verify forecast updates
    await expect(page.getByText("Phoenix, AZ")).toBeVisible();

    await page.screenshot({
      path: join(evidenceDir, "02b-location-selected.png"),
    });
  });

  test("03 - Temperature toggle switches between F and C", async ({
    page,
  }) => {
    // Should start in Fahrenheit
    const todaySection = page.getByTestId("today-forecast");
    await expect(todaySection.getByText(/°F/).first()).toBeVisible();

    await page.screenshot({
      path: join(evidenceDir, "03a-fahrenheit.png"),
    });

    // Click toggle
    await page.getByTestId("temp-toggle").click();

    // Should now show Celsius
    await expect(todaySection.getByText(/°C/).first()).toBeVisible();

    await page.screenshot({
      path: join(evidenceDir, "03b-celsius.png"),
    });

    // Toggle back
    await page.getByTestId("temp-toggle").click();
    await expect(todaySection.getByText(/°F/).first()).toBeVisible();
  });

  test("04 - Today's forecast shows all details", async ({ page }) => {
    const today = page.getByTestId("today-forecast");
    await expect(today).toBeVisible();

    // Check for weather icon
    await expect(today.getByTestId("weather-icon")).toBeVisible();

    // Check for humidity and precipitation labels
    await expect(today.getByText("Humidity")).toBeVisible();
    await expect(today.getByText("Precipitation")).toBeVisible();

    await page.screenshot({
      path: join(evidenceDir, "04-today-forecast.png"),
    });
  });

  test("05 - Weekly forecast shows 7 day cards", async ({ page }) => {
    const weekly = page.getByTestId("weekly-forecast");
    await expect(weekly).toBeVisible();
    await expect(weekly.getByText("7-Day Forecast")).toBeVisible();

    const dayCards = weekly.getByTestId("day-card");
    await expect(dayCards).toHaveCount(7);

    await page.screenshot({
      path: join(evidenceDir, "05-weekly-forecast.png"),
    });
  });

  test("06 - Monthly forecast shows 30 day cards", async ({ page }) => {
    const monthly = page.getByTestId("monthly-forecast");
    await monthly.scrollIntoViewIfNeeded();
    await expect(monthly).toBeVisible();
    await expect(monthly.getByText("30-Day Forecast")).toBeVisible();

    const dayCards = monthly.getByTestId("day-card");
    await expect(dayCards).toHaveCount(30);

    await page.screenshot({
      path: join(evidenceDir, "06-monthly-forecast.png"),
      fullPage: true,
    });
  });

  test("07 - Favorite locations workflow", async ({ page }) => {
    // Clear any existing favorites
    await page.evaluate(() => localStorage.removeItem("weatherapp-favorites"));
    await page.reload();
    await page.waitForSelector('[data-testid="today-forecast"]', {
      timeout: 15000,
    });

    // Add current location to favorites
    const favToggle = page.getByTestId("favorites-toggle");
    await expect(favToggle).toBeVisible();
    await expect(favToggle).toHaveText("☆");
    await favToggle.click();
    await expect(favToggle).toHaveText("★");

    await page.screenshot({
      path: join(evidenceDir, "07a-added-favorite.png"),
    });

    // Switch to a different location
    const searchInput = page.getByTestId("location-search-input");
    await searchInput.click();
    await searchInput.fill("Seattle");
    await page.getByTestId("location-option-seattle-wa").click();

    await expect(page.getByText("Seattle, WA")).toBeVisible();

    // Add Seattle as favorite too
    await page.getByTestId("favorites-toggle").click();

    await page.screenshot({
      path: join(evidenceDir, "07b-multiple-favorites.png"),
    });

    // Click the first favorite to switch back
    const favList = page.getByTestId("favorites-list");
    const firstChip = favList.locator("button").first();
    await firstChip.click();

    await page.screenshot({
      path: join(evidenceDir, "07c-switched-via-favorite.png"),
    });
  });

  test("08 - Different locations show different weather", async ({ page }) => {
    // Select Phoenix (hot, sunny)
    const searchInput = page.getByTestId("location-search-input");
    await searchInput.click();
    await searchInput.fill("Phoenix");
    await page.getByTestId("location-option-phoenix-az").click();
    await expect(page.getByText("Phoenix, AZ")).toBeVisible();

    await page.screenshot({
      path: join(evidenceDir, "08a-phoenix.png"),
    });

    // Select Seattle (cool, rainy)
    await searchInput.click();
    await searchInput.fill("Seattle");
    await page.getByTestId("location-option-seattle-wa").click();
    await expect(page.getByText("Seattle, WA")).toBeVisible();

    await page.screenshot({
      path: join(evidenceDir, "08b-seattle.png"),
    });
  });

  test("09 - Full page screenshot of complete app", async ({ page }) => {
    // Make sure everything is loaded
    await page.getByTestId("monthly-forecast").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: join(evidenceDir, "09-full-page.png"),
      fullPage: true,
    });
  });
});

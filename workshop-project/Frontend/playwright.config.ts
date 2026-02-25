import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  testDir: "./e2e",
  outputDir: join(__dirname, "e2e", "evidence", "test-results"),
  fullyParallel: false,
  retries: 0,
  timeout: 30000,
  use: {
    baseURL: "http://localhost:5173",
    screenshot: "on",
    video: "on",
    trace: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "dotnet run --project ../Backend/WeatherApp.Api/WeatherApp.Api.csproj --launch-profile http",
      port: 5000,
      reuseExistingServer: true,
      timeout: 30000,
    },
    {
      command: "npm run dev",
      port: 5173,
      reuseExistingServer: true,
      timeout: 15000,
    },
  ],
});

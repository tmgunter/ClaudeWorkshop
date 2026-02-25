# Claude Code Workshop: Weather App

A hands-on 20-minute workshop for learning agentic coding workflows with Claude Code, using a full-stack weather application built with React 19 + .NET 10.

## Repository Structure

```
ClaudeWorkshop/
├── completed-project/        # Reference implementation with CLAUDE.md files
│   ├── CLAUDE.md             # Root-level project context for Claude Code
│   ├── Backend/
│   │   ├── CLAUDE.md         # Backend-specific Claude Code context
│   │   └── ...
│   └── Frontend/
│       ├── CLAUDE.md         # Frontend-specific Claude Code context
│       └── ...
└── workshop-project/         # Your starting point (no CLAUDE.md)
    ├── Backend/
    └── Frontend/
```

**`completed-project/`** — The "north star" reference with pre-configured `CLAUDE.md` files at root, Backend, and Frontend levels. Use this to see what a well-configured Claude Code workspace looks like.

**`workshop-project/`** — Identical source code without any `CLAUDE.md` or `.claude/` configuration. This is your starting point for the workshop.

## Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 22+](https://nodejs.org/) with npm
- A code editor (VS Code recommended)

## Workshop Guide (20 Minutes)

### Part 1: Setup and Initialization (5 minutes)

1. **Clone and navigate to the workshop project:**
   ```bash
   git clone <repo-url>
   cd ClaudeWorkshop/workshop-project
   ```

2. **Initialize Claude Code:**
   ```bash
   claude
   ```
   Run `/init` to generate your `CLAUDE.md` file. Review what Claude generates and compare it with `completed-project/CLAUDE.md`.

3. **Verify the app runs:**
   ```bash
   # Terminal 1: Start the backend
   cd Backend && dotnet run --project WeatherApp.Api --launch-profile http

   # Terminal 2: Start the frontend
   cd Frontend && npm install && npm run dev
   ```
   Open http://localhost:5173 — notice the weather icons show as "?" characters.

### Part 2: Bug Fix with Claude Code (5 minutes)

4. **Ask Claude to investigate and fix the weather icon bug.** The icons display as "?" instead of weather emojis. This is caused by a mismatch between how the Backend serializes the `WeatherCondition` enum and how the Frontend expects to receive it. Let Claude explore the codebase, identify the root cause, and propose a fix.

5. **Verify the fix** by refreshing the browser and confirming that weather emojis (sun, cloud, rain, etc.) display correctly.

### Part 3: Add a New Feature (10 minutes)

6. **Ask Claude to add a feature of your choice.** Some ideas:
   - Add a "feels like" temperature to the today forecast
   - Add wind speed data to each day card
   - Add a dark mode toggle
   - Add an air quality index indicator
   - Make the location search support autocomplete filtering

7. **Ask Claude to write tests** for the new feature and verify coverage stays above 90%.

## The Intentional Bug

The weather app has a deliberate bug where weather condition icons display as "?" instead of the correct emoji. This is caused by a mismatch between how the Backend serializes the `WeatherCondition` enum and how the Frontend expects to receive it. This provides a realistic debugging exercise for the workshop.

**Before fix:**

<img width="2508" height="1364" alt="Weather icons showing as question marks" src="https://github.com/user-attachments/assets/e8779be1-b4a8-4664-88c2-7837a16a9f14" />

**After fix:**

<img width="1280" height="1291" alt="Weather icons displaying correctly" src="https://github.com/user-attachments/assets/f53cde97-60b7-4cdb-9967-8a51ae7470be" />

## Tech Stack

| Layer    | Technology                        | Port |
|----------|-----------------------------------|------|
| Frontend | React 19, TypeScript 5.9, Vite 7 | 5173 |
| Backend  | .NET 10, ASP.NET Core, C#        | 5000 |
| Testing  | Vitest, Playwright, xUnit        | --   |

## Running Tests

```bash
# Backend unit tests with coverage
cd Backend
dotnet test --settings coverlet.runsettings --collect:"XPlat Code Coverage"

# Frontend unit tests with coverage
cd Frontend
npx vitest run --coverage

# Frontend E2E tests (starts both servers automatically)
cd Frontend
npx playwright test
```

## License

MIT

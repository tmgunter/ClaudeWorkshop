# ClaudeWorkshop
Examples to use with Claude to learn Agentic workflows

This code was created with the following prompt using Opus 4.6 to get the general idea in place:

```
I'm building a weather app. I want to show the following details:

1. Today's forecast.
2. The week forecast (a 7 day forecast) below the current day's forecast.
3. The month view of the upcoming forecast below the 7-day forecast.
4. F/C toggle so we can switch between different measurements, depending on the user's preference.
5. Each day in the forecast should indicate humidity, precipitation chance, and a gif or icon for each day's overall weather (sunny, rain, snow, or other relevant conditions). For the current day weather, let's make it a slightly bigger section and put a nice graphic indicating the weather.
6. There should be a dropdown or a search bar at the top where we can search or select a single location.
7. Implement a favorite locations feature so I can switch between different favorite locations to view different forecasts easily.

Build the weather app with the following specific criteria:

1. Use React with typescript for the frontend. It should use Vite as the build tooling framework.
2. The frontend should call an API on the backend to get the weather data. This should be using C# and the latest .NET for the main language and framework.
3. The direction in the project should be separated between "Frontend" and "Backend". Nothing crazy!
4. The frontend and backend should have unit tests for any feature that is built. The project should ensure that new features are tested and have at least 90% code coverage.
5. For testing the frontend, I would like to use Playwright MCP and ensure that thre  is a directory for storing evidence of functionality working as expected. Take screenshots and generate gifs so that I can review them later.
6. On the backend, abstract out the weather service into good design patterns like Facade or other common patterns that make sense.

The data can just mocked on the backend API for demo purposes. I don't necessarily need to call a live service to get live data. Make the mocked data somewhat reasonable for the weather of a particular area to make the POC feel realistic.

```

Then, to create an example issue, we simply had Claude create one for us, asking the following:

```
Can we create an intentional bug where we don't have the weather icons displaying correctly? The goal is to put this into a repo as a demo example as a starting point for a workshop, showcasing how to solve a bug with Claude
```

Nothing special. This just gives us a basis for the example.

# Example Screenshots

## Intentional Bug (before fix):

<img width="2508" height="1364" alt="image" src="https://github.com/user-attachments/assets/e8779be1-b4a8-4664-88c2-7837a16a9f14" />

## After Fix:

<img width="1280" height="1291" alt="image" src="https://github.com/user-attachments/assets/f53cde97-60b7-4cdb-9967-8a51ae7470be" />

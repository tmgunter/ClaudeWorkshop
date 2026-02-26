---
name: test-all
description: Run all backend and frontend tests and provide a health report
disable-model-invocation: true
---

Run the full test suite for the weather app and present a clear health report.

## Steps

1. Run **backend tests** (C# / xUnit):
   ```
   cd Backend && dotnet test --verbosity normal
   ```

2. Run **frontend unit tests** (Vitest):
   ```
   cd Frontend && npx vitest run
   ```

3. Present results as a health dashboard:
   - Use a checkmark for passing suites, X for failing
   - Show total pass/fail counts for each suite
   - If anything failed, list the failing test names with a one-line explanation
   - End with an overall status: "All Clear" or "Issues Found"

Keep the output concise. Developers want a quick glance, not a wall of text.

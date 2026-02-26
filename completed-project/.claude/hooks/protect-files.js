// Hook: Protected Files Guard (PreToolUse)
// Blocks Claude from editing sensitive files unless you approve
// Exit code 2 = block the action, stderr message becomes feedback to Claude

const PROTECTED_PATTERNS = [
  ".env",
  "package-lock.json",
  ".claude/settings.json",
  ".claude/hooks/",
];

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input);
    const filePath = (data.tool_input?.file_path || "").replace(/\\/g, "/");

    for (const pattern of PROTECTED_PATTERNS) {
      if (filePath.includes(pattern)) {
        process.stderr.write(
          `Blocked: "${filePath}" is a protected file (matches "${pattern}"). ` +
            `This file is guarded by the protect-files hook. ` +
            `Ask the user for explicit permission before modifying it.`
        );
        process.exit(2);
      }
    }
  } catch {
    // If we can't parse input, allow the action
  }
  process.exit(0);
});

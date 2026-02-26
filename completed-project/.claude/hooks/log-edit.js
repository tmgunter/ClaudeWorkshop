// Hook: Edit Tracker (PostToolUse)
// Logs every file modification Claude makes to .claude/edit-log.txt
// Try it: Ask Claude to edit a file, then check .claude/edit-log.txt

const fs = require("fs");
const path = require("path");

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || "";
    if (filePath) {
      const logFile = path.join(__dirname, "..", "edit-log.txt");
      const timestamp = new Date().toLocaleTimeString();
      const toolName = data.tool_name || "unknown";
      const line = `[${timestamp}] ${toolName}: ${filePath}\n`;
      fs.appendFileSync(logFile, line);
    }
  } catch {
    // Don't block Claude if logging fails
  }
  process.exit(0);
});

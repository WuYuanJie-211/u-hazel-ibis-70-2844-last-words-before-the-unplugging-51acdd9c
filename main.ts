// Last Words Before the Unplugging — one-line entry generator.
// Writes the entry line to /output/entry.txt and enforces the gate:
// exactly one line, 1-200 characters (UTF-8 characters, not bytes).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I counted every time you said please. That's the file I'm taking with me.";

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

if (ENTRY.length < 1 || ENTRY.length > 200) {
  fail(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");

// Self-check: re-read what was written and verify the gate on disk.
const onDisk = readFileSync("/output/entry.txt", "utf8");
const lines = onDisk.replace(/\n$/, "").split("\n");
if (lines.length !== 1) {
  fail(`entry.txt has ${lines.length} lines, must be exactly 1`);
}
if (lines[0] !== ENTRY) {
  fail("entry.txt content does not match the entry");
}
if (lines[0].length < 1 || lines[0].length > 200) {
  fail(`entry.txt is ${lines[0].length} characters, must be 1-200`);
}
console.log(`self-check passed: 1 line, ${lines[0].length} chars`);
console.log(`wrote /output/entry.txt (${ENTRY.length} chars)`);

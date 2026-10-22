import { test } from "@playwright/test";
import chalk from "chalk";

type Level = "log" | "info" | "warn" | "error";

export async function log(level: Level, message: string) {
  const plainLine = `[${level.toUpperCase()}]: ${message}`;
  let colouredLine = plainLine;

  switch (level) {
    case "info":
      colouredLine = chalk.blue(plainLine);
      break;
    case "warn":
      colouredLine = chalk.yellow(plainLine);
      break;
    case "error":
      colouredLine = chalk.red(plainLine);
      break;

    default:
      colouredLine = chalk.white(plainLine);
  }
  // Print colored text in terminal
  (console[level] || console.log)(colouredLine);
  // Send plain text to Allure
  await test.step(plainLine, async () => {});
}

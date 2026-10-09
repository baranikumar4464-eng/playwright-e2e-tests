import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";
dotenv;

export default async function globalSetup(config: FullConfig) {
  const resultsDir = path.resolve(process.cwd(), "allure-results");
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }
}

import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export default async function globalSetup(config: FullConfig) {
  const resultsDir = path.resolve(process.cwd(), "allure-results");
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }
}

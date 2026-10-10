import dotenv from "dotenv";
import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default async function globalSetup(config: FullConfig) {
  /* Executed before all the workers start. Good place to keep one-off tasks before all workers start */
  console.log("Global setup started");
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log("Running tests in local environment");
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
      console.log("Allure results directory deleted");
    }
  }
  // Add any other global setup logic here:
  // - Database initialization
  // - Test data preparation
  // - Environment configuration
  // - External service setup
  // - Start test servers
  console.log("Global setup completed");
}

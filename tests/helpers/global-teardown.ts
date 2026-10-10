import { type FullConfig } from "@playwright/test";
import { exec } from "node:child_process";

export default async function globalTeardown(_config: FullConfig) {
  /* Executed after all the workers have finished. Good place to keep one-off tasks after all workers finish */
  console.log("Global teardown started");
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log("Running tests in local environment");
    exec("allure serve allure-results", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Allure command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Allure command stderr: ${stderr}`);
      }
      if (stdout) {
        console.log(`Allure command stdout: ${stdout}`);
      }
    });
    console.log("Allure report generated successfully");
  }
}

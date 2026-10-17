// import { type FullConfig } from "@playwright/test";
// import { exec } from "node:child_process";

// export default async function globalTeardown(_config: FullConfig) {
//   /* Executed after all the workers have finished. Good place to keep one-off tasks after all workers finish */
//   console.log("Global teardown started");
//   if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
//     console.log("Running tests in local environment");
//     exec("allure serve allure-results", (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error executing Allure command: ${error.message}`);
//         return;
//       }
//       if (stderr) {
//         console.error(`Allure command stderr: ${stderr}`);
//       }
//       if (stdout) {
//         console.log(`Allure command stdout: ${stdout}`);
//       }
//     });
//     console.log("Allure report generated successfully");
//   }
// }

import { type FullConfig } from "@playwright/test";
import { exec } from "node:child_process";

export default async function globalTeardown(_config: FullConfig) {
  console.log("Global teardown started");

  if (process.env.RUNNER?.toUpperCase() !== "LOCAL") {
    console.log("Skipping Allure server");
    return;
  }

  const allureProcess = exec("allure serve allure-results");

  allureProcess.on("error", (error) => {
    console.error(`Failed to start Allure: ${error.message}`);
  });

  allureProcess.stdout?.on("data", (data) => {
    console.log(data.toString());
  });

  allureProcess.stderr?.on("data", (data) => {
    console.error(data.toString());
  });

  console.log("Allure serve command started");
}

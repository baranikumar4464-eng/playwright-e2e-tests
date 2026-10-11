import { test, devices } from "@playwright/test";

test("Bring all the available devices", async ({ page }) => {
  console.log(`>> Devices name..>>${Object.keys(devices)}`);
});

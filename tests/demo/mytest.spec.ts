// import { test, expect } from "@playwright/test";

// test("should load homepage with the correct title", async ({ page }) => {
//   //1.Go to the home page
//   await page.goto("https://katalon-demo-cura.herokuapp.com/");

//   //2.Asssert if the title is correct
//   await expect(page).toHaveTitle("CURA Healthcare Service");
//   //3.Assert the header text
//   await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
// });

import { test, expect } from "@playwright/test";

test("Check the webpage is displaying with correct title or not", async ({
  page,
}) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  await expect(page).toHaveTitle("CURA Healthcare Service");

  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

// import { test, expect } from "@playwright/test";

// test("Testing something", { tag: "@smoke" }, async ({ page }, testInfo) => {
//   await page.locator("//h").click();
// });

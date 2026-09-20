import { test, expect } from "@playwright/test";

test("Autoquote PNI screen", async ({ page }) => {
  await page.goto("https://memberapps.qa.acg.aaa.com/auto-quote/auto-quote?p=auto");
  await expect(page.getByText("Auto Insurance Quote")).toBeVisible();
  await page.getByRole("textbox", { name: "First Name" }).fill("Test");
  await page.getByRole("textbox", { name: "Last Name" }).fill("Test");
  await page.getByRole("textbox", { name: "Email address" }).fill("Test@test.com");
});

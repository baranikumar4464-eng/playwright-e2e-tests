//https://katalon-demo-cura.herokuapp.com/

import { test, expect } from "@playwright/test";

test("SHould login successfully", async ({ page }) => {
  //launch the url and assert the title and header
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
  //CLick on the make appointment
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(
    page.getByText("Please login to make appointment."),
  ).toBeVisible();

  //Login
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  //Assert a text
  await expect(page.locator("//h4")).toHaveText("CURA Healthcare Service");
  await page.close();
});

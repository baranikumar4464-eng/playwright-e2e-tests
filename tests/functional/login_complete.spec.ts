//https://katalon-demo-cura.herokuapp.com/

import { test, expect } from "@playwright/test";

test.describe("Login functionality check", () => {
  test.beforeEach("Go to login page", async ({ page }) => {
    //launch the url and assert the title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
    //CLick on the make appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(
      page.getByText("Please login to make appointment."),
    ).toBeVisible();
  });

  test("Should login successfully", async ({ page }) => {
    //Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //Assert a text
    await expect(page.locator("//h4")).toHaveText("CURA Healthcare Service");
    // await page.close();
  });

  test("Should prevent login successfully", async ({ page }) => {
    //Login
    await page.getByLabel("Username").fill("James Bond");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //Assert after failing

    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
    await page.close();
  });
});

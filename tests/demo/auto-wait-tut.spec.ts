import { test, expect } from "@playwright/test";

test("Login with valid credential to make appointment", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
  /*//Click on the make appointment
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByText("Please login to make appointment.")).toBeVisible();
  */

  // * 1. Just locator element - Lazy
  // -> No action, proves that element is LAZY
  //   let user = await page.getByLabel("Userid");
  // * 2. Invalid locator on action method
  // -> Error: locator.fill: Test timeout of 30000ms exceeded.
  // * 3. Valid locator but invalid action
  // -> Error: locator.check: Error: Not a checkbox or radio button
  //   let user = await page.getByLabel("Username");
  //   user.check();
  // * 4. Invalid locator on expect method
  // -> Error: expect(locator).toContainText(expected) failed, Timeout: 5000ms
  //Login
  //   await expect(page.locator("//h2")).toHaveText("CURA Healthcare Service");
  //   await page.getByLabel("Username").fill("John Doe");
  //   await page.getByLabel("Password").fill("ThisIsNotAPassword");
  //   await page.getByRole("button", { name: "Login" }).click();
});

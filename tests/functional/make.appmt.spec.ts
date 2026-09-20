import { test, expect } from "@playwright/test";

test.describe("Make appointment scenarios", () => {
  //prerequisites- Login with valid credentials
  test.beforeEach("Login with valid credential to make appointment", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
    //CLick on the make appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make appointment.")).toBeVisible();

    //Login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("should make an appoint with non default values", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Make Appointment");
    //dropdown
    await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");
    //checkbox
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
    //radio button
    await page.getByRole("radio", { name: "Medicaid" }).check();
    //date input/ picker
    await page.locator("span").click();
    await page.getByRole("columnheader", { name: "»" }).click();
    await page.getByRole("columnheader", { name: "»" }).click();
    await page.getByRole("columnheader", { name: "»" }).click();
    await page.getByRole("columnheader", { name: "»" }).click();
    await page.getByRole("cell", { name: "31" }).click();
    //multilne input box
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("Playwright with codegen\nMaking appointment with non default values");
    //button
    await page.getByRole("button", { name: "Book Appointment" }).click();
    //Assertion
    await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
    await expect(page.locator("#facility")).toContainText("Hongkong CURA Healthcare Center");
    await expect(page.locator("#visit_date")).toContainText("31/12/2026");
    await expect(page.locator("#comment")).toContainText("Playwright with codegen Making appointment with non default values");
  });
});

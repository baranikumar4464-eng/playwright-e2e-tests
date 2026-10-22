import { test, expect } from "@playwright/test";
import fileHelpers from "../helpers/file-helpers";
import { log } from "../helpers/logger";
import path from "path";

const makeaptCSVTestData = path.resolve(`${process.cwd()}//data/demo/make-apt-test-data.csv`);
const mktdata = fileHelpers.readCSV(makeaptCSVTestData);

for (const data of mktdata) {
  // console.log(`>>Test data: ${JSON.stringify(data)}`);
  test.describe("Make appointment scenarios", () => {
    //prerequisites- Login with valid credentials
    test.beforeEach("Login with valid credential to make appointment", async ({ page }, testInfo) => {
      //get url from config file
      const envConfig = testInfo.project.use as any;
      await page.goto(envConfig.appUrl);
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await log("info", "launched url in successfully");
      await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
      //CLick on the make appointment
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.getByText("Please login to make appointment.")).toBeVisible();

      //Login
      await page.getByLabel("Username").fill(process.env.TEST_USERNAME_CURA);
      await page.getByLabel("Password").fill(process.env.TEST_PASSWORD_CURA);
      await page.getByRole("button", { name: "Login" }).click();
      await log("info", "Logged in successfully");
      await log("warn", "sample warning");
      await log("error", "sample error");
      await log("log", "normal log");
    });

    test(`${data.testId} should make an appoint with test data`, async ({ page }) => {
      await expect(page.locator("h2")).toContainText("Make Appointment");
      //dropdown
      await page.getByLabel("Facility").selectOption(data.facility);
      //checkbox
      await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
      //radio button
      await page.getByRole("radio", { name: data.hcp }).check();
      //date input/ picker
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).pressSequentially(data.visitDate);
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");
      //multilne input box
      await page.getByRole("textbox", { name: "Comment" }).click();
      await page.getByRole("textbox", { name: "Comment" }).fill("Playwright with codegen\nMaking appointment with non default values");
      //button
      await page.getByRole("button", { name: "Book Appointment" }).click();
      //Assertion
      await expect(page.getByRole("heading", { name: "Appointment Confirmation" })).toBeVisible();
      await expect(page.locator("#facility")).toContainText(data.facility);
      await expect(page.locator("#comment")).toContainText("Playwright with codegen Making appointment with non default values");
    });
  });
}

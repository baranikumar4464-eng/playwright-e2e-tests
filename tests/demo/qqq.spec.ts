import { test, expect } from "@playwright/test";

// Suite-level annotation + regression tag
test.describe(
  "Make appointment scenarios",
  {
    annotation: {
      type: "Story",
      description: "JIRA-123: Make appointment positive scenarios",
    },
    tag: "@regression",
  },
  () => {

    // --------------------------------------------------
    // SMOKE TEST - Successful Login
    // --------------------------------------------------
    test(
      "should login successfully",
      { tag: "@smoke" },
      async ({ page }) => {

        await page.goto("https://katalon-demo-cura.herokuapp.com/");

        await expect(page).toHaveTitle("CURA Healthcare Service");

        await page.getByRole("link", { name: "Make Appointment" }).click();

        await expect(
          page.getByText("Please login to make appointment.")
        ).toBeVisible();

        // Login
        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");

        await page.getByRole("button", { name: "Login" }).click();

        // Successful login assertion
        await expect(
          page.getByRole("heading", { name: "Make Appointment" })
        ).toBeVisible();
      }
    );


    // --------------------------------------------------
    // PREREQUISITE - Login before every appointment test
    // --------------------------------------------------
    test.beforeEach(
      "Login with valid credential to make appointment",
      async ({ page }) => {

        await page.goto("https://katalon-demo-cura.herokuapp.com/");

        await expect(page).toHaveTitle("CURA Healthcare Service");

        await expect(page.locator("//h1")).toHaveText(
          "CURA Healthcare Service"
        );

        // Click Make Appointment
        await page
          .getByRole("link", { name: "Make Appointment" })
          .click();

        await expect(
          page.getByText("Please login to make appointment.")
        ).toBeVisible();

        // Login
        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();
      }
    );


    // --------------------------------------------------
    // APPOINTMENT TEST
    // --------------------------------------------------
    test(
      "should make an appoint with non default values",
      {
        annotation: {
          type: "Scenario",
          description: "Non Default selection",
        },
      },
      async ({ page, browserName }) => {

        test.skip(browserName === "firefox", "Open defect AC123");

        await expect(page.locator("h2")).toContainText(
          "Make Appointment"
        );

        // Dropdown
        await page
          .getByLabel("Facility")
          .selectOption("Hongkong CURA Healthcare Center");

        // Checkbox
        await page
          .getByRole("checkbox", {
            name: "Apply for hospital readmission",
          })
          .check();

        // Radio button
        await page
          .getByRole("radio", { name: "Medicaid" })
          .check();

        // Date picker
        await page.locator("span").click();

        await page.getByRole("columnheader", { name: "»" }).click();
        await page.getByRole("columnheader", { name: "»" }).click();
        await page.getByRole("columnheader", { name: "»" }).click();
        await page.getByRole("columnheader", { name: "»" }).click();

        await page.getByRole("cell", { name: "22" }).click();

        // Multiline input
        await page.getByRole("textbox", { name: "Comment" }).fill(
          "Playwright with codegen\nMaking appointment with non default values"
        );

        // Button
        await page
          .getByRole("button", { name: "Book Appointment" })
          .click();

        // Assertions
        await expect(
          page.getByRole("heading", {
            name: "Appointment Confirmation",
          })
        ).toBeVisible();

        await expect(page.locator("#facility")).toContainText(
          "Hongkong CURA Healthcare Center"
        );

        await expect(page.locator("#visit_date")).toContainText(
          "31/12/2026"
        );

        await expect(page.locator("#comment")).toContainText(
          "Playwright with codegen Making appointment with non default values"
        );
      }
    );
  }
);
```;

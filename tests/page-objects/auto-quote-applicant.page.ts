import { expect, type Page } from "@playwright/test";
import AutoQuoteBasePage from "./auto-quote-base.page";

export default class AutoQuoteApplicantPage extends AutoQuoteBasePage {
  constructor(page: Page) {
    super(page);
  }

  get firstNameInput() {
    return this.page.getByRole("textbox", { name: "First Name", exact: true });
  }

  get lastNameInput() {
    return this.page.getByRole("textbox", { name: "Last Name", exact: true });
  }

  get dateOfBirthInput() {
    return this.page.getByRole("textbox", { name: "Date of Birth (mm/dd/yyyy)", exact: true });
  }

  get emailInput() {
    return this.page.getByRole("textbox", { name: "Email address", exact: true });
  }

  get phoneInput() {
    return this.page.getByRole("textbox", { name: "Preferred contact number", exact: true });
  }

  get continueButton() {
    return this.page.getByRole("button", { name: "Continue", exact: true });
  }

  get mobilePhoneCheckbox() {
    return this.page.locator("#ismobile");
  }

  get mobilePhoneCheckboxMark() {
    return this.page.locator("label.cov-info .checkmark");
  }

  async startQuote(quoteUrl: string) {
    if (!quoteUrl) {
      throw new Error('The "auto-quote-qa" URL must be configured for this project.');
    }

    await this.page.goto(quoteUrl, { waitUntil: "domcontentloaded" });
    await this.waitForScreenReady(this.firstNameInput);
  }

  async completeApplicantDetails(data: { firstName: string; lastName: string; dateOfBirth: string; email: string; phone: string }) {
    await this.waitForScreenReady(this.firstNameInput);
    await this.fillAfterLoading(this.firstNameInput, data.firstName);
    await this.fillAfterLoading(this.lastNameInput, data.lastName);
    await this.fillAfterLoading(this.dateOfBirthInput, data.dateOfBirth);
    await this.fillAfterLoading(this.emailInput, data.email);
    await this.fillAfterLoading(this.phoneInput, data.phone);

    await this.clickAfterLoading(this.mobilePhoneCheckboxMark);
    await expect(this.mobilePhoneCheckbox).toBeChecked();
    await this.clickAfterLoading(this.continueButton);
  }
}

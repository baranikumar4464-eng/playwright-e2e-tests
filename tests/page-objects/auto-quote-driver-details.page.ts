import { expect, type Page } from "@playwright/test";
import AutoQuoteBasePage from "./auto-quote-base.page";

export default class AutoQuoteDriverDetailsPage extends AutoQuoteBasePage {
  constructor(page: Page) {
    super(page);
  }

  get continueButton() {
    return this.page.getByRole("button", { name: "Continue", exact: true });
  }

  private dropdown(label: string) {
    return this.page
      .locator("mat-form-field")
      .filter({ has: this.page.getByText(label, { exact: true }) })
      .getByRole("combobox");
  }

  private async selectDropdown(label: string, option: string) {
    const dropdown = this.dropdown(label);
    await expect(dropdown).toHaveCount(1);

    const optionLocator = this.page.getByRole("option", { name: option, exact: true });
    const tagName = await dropdown.evaluate((element) => element.tagName);

    if (tagName === "INPUT") {
      await this.fillAfterLoading(dropdown, option);
    } else {
      await this.clickAfterLoading(dropdown);
    }

    await expect(optionLocator).toBeVisible();
    await this.clickAfterLoading(optionLocator);

    if (tagName === "INPUT") {
      await expect(dropdown).toHaveValue(option);
    } else {
      await expect(dropdown).toContainText(option);
    }
  }

  async completeDriverDetails() {
    await this.waitForScreenReady(this.page.locator("#gender_primary_driver_Male"));
    await this.checkAfterLoading(this.page.locator("#gender_primary_driver_Male"));
    await this.checkAfterLoading(this.page.locator("#maritalStatus_primary_driver_Single"));

    await this.selectDropdown("Industry", "Information Technology");
    await this.selectDropdown("Education Level", "Graduate Work or Degree");
    await this.selectDropdown("Occupation", "Analyst");
    await this.selectDropdown("Current insurance company", "21st Century Casualty Company");
    await this.selectDropdown("Years With Current Insurance Company", "1");
    await this.selectDropdown("Bodily injury limits", "15,000/30,000");
    await this.selectDropdown("Current coverage", "Continuous for prior 6 months or more");

    await this.clickAfterLoading(this.continueButton);

    const driverSummaryHeading = this.page.getByRole("heading", {
      name: /here is who is listed on your quote/i,
    });
    await this.waitForScreenReady(driverSummaryHeading);
    await this.clickAfterLoading(this.continueButton);
  }
}

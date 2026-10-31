import { expect, type Page } from "@playwright/test";
import AutoQuoteBasePage from "./auto-quote-base.page";

export default class AutoQuoteTelematicsPage extends AutoQuoteBasePage {
  constructor(page: Page) {
    super(page);
  }

  get continueButton() {
    return this.page.getByRole("button", { name: "Continue", exact: true });
  }

  async continueToDiscounts() {
    await this.waitForScreenReady(this.page.locator("app-telematics"));
    await expect(this.page.locator("app-telematics")).toContainText(
      "AAADrive measures your driving behaviors",
    );
    await this.clickAfterLoading(this.continueButton);
  }
}

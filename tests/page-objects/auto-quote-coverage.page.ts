import { expect, type Page } from "@playwright/test";
import AutoQuoteBasePage from "./auto-quote-base.page";

export default class AutoQuoteCoveragePage extends AutoQuoteBasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyPreQuoteSummary() {
    await this.waitForScreenReady(this.page.locator("app-auto-coverage"));
    await expect(this.page.locator("app-auto-coverage")).toContainText(
      "Verify your information to get the most accurate quote possible.",
    );
  }
}

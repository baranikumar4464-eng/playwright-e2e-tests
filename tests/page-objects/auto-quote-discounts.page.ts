import { expect, type Page } from "@playwright/test";
import AutoQuoteBasePage from "./auto-quote-base.page";

export default class AutoQuoteDiscountsPage extends AutoQuoteBasePage {
  constructor(page: Page) {
    super(page);
  }

  get continueButton() {
    return this.page.getByRole("button", { name: "Continue", exact: true });
  }

  async completeDiscountQuestions() {
    await this.waitForScreenReady(this.page.getByRole("heading", { name: "You may be eligible for" }));
    await expect(this.page.getByText("Do you own a home, condo or")).toBeVisible();
    await this.clickAfterLoading(this.page.getByText("Home", { exact: true }));
    await expect(this.page.locator("#isHome")).toBeChecked();

    await expect(this.page.getByText("Are we the first insurance")).toBeVisible();
    const noOption = this.page.getByRole("radio").nth(1);
    await expect(noOption).toBeVisible();
    await this.checkAfterLoading(noOption);
    await this.clickAfterLoading(this.continueButton);
  }
}

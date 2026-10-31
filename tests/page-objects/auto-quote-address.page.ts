import { expect, type Page } from "@playwright/test";
import AutoQuoteBasePage from "./auto-quote-base.page";

export default class AutoQuoteAddressPage extends AutoQuoteBasePage {
  constructor(page: Page) {
    super(page);
  }

  get addressInput() {
    return this.page.getByRole("textbox", { name: "Street address, city, state", exact: true });
  }

  get continueButton() {
    return this.page.getByRole("button", { name: "Continue", exact: true });
  }

  async enterAddress(address: string) {
    await this.waitForScreenReady(this.addressInput);
    await this.fillAfterLoading(this.addressInput, address);

    const firstSuggestion = this.page.locator(".pac-container .pac-item").first();
    await expect(firstSuggestion).toBeVisible();
    await this.clickAfterLoading(firstSuggestion);

    const secondAddressOption = this.page.getByRole("radio").nth(1);
    await expect(secondAddressOption).toBeVisible();
    await this.checkAfterLoading(secondAddressOption);
    await this.clickAfterLoading(this.continueButton);
  }
}

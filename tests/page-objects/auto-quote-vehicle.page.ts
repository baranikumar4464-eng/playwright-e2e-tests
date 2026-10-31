import { expect, type Page } from "@playwright/test";
import AutoQuoteBasePage from "./auto-quote-base.page";

export default class AutoQuoteVehiclePage extends AutoQuoteBasePage {
  constructor(page: Page) {
    super(page);
  }

  get vinInput() {
    return this.page.getByRole("textbox", { name: "Vehicle Identification Number", exact: true });
  }

  get findButton() {
    return this.page.getByRole("button", { name: "Find", exact: true });
  }

  get addOtherVehicleButton() {
    return this.page.getByRole("button", { name: "Add other vehicle", exact: true });
  }

  get saveVehicleButton() {
    return this.page.getByRole("button", { name: "Save Vehicle", exact: true });
  }

  get continueButton() {
    return this.page.getByRole("button", { name: "Continue", exact: true });
  }

  private async logQuoteNumberIfPresent() {
    const screenText = await this.page.locator("body").innerText();
    const quoteNumber = screenText.match(
      /\bquote\s*(?:number|no\.?|#|id)\s*[:#-]?\s*([A-Z0-9-]{4,})\b/i,
    )?.[1];

    if (quoteNumber) {
      console.info(`Auto Quote number: ${quoteNumber}`);
    } else {
      console.info("Auto Quote number is not displayed on the vehicle screen.");
    }
  }

  async addVehicle(vin: string) {
    await this.waitForScreenReady(this.vinInput.or(this.addOtherVehicleButton), 120_000);
    await this.logQuoteNumberIfPresent();

    if (await this.addOtherVehicleButton.isVisible()) {
      await this.clickAfterLoading(this.addOtherVehicleButton);
    }

    await this.waitForScreenReady(this.vinInput, 120_000);
    await this.fillAfterLoading(this.vinInput, vin);
    await this.clickAfterLoading(this.findButton);
    await this.waitForScreenReady(this.saveVehicleButton);
    await this.clickAfterLoading(this.saveVehicleButton);
    await this.clickAfterLoading(this.continueButton);
  }
}

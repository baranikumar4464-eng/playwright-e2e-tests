import { expect, type Locator, type Page } from "@playwright/test";

const LOADING_INDICATOR_SELECTOR = [
  '[aria-busy="true"]',
  '[role="progressbar"]',
  "app-spinner",
  "app-loader",
  ".spinner",
  '[class*="spinner"]',
  '[id*="spinner"]',
  ".loader",
  ".loading-overlay",
  ".loading-indicator",
].join(", ");

export default class AutoQuoteBasePage {
  constructor(protected readonly page: Page) {}

  protected async waitForLoadingToFinish() {
    const visibleLoadingIndicator = this.page
      .locator(LOADING_INDICATOR_SELECTOR)
      .filter({ visible: true })
      .first();
    await expect(visibleLoadingIndicator).toBeHidden({ timeout: 30_000 });
  }

  protected async waitForScreenReady(screenLocator: Locator, timeout = 30_000) {
    await expect(screenLocator).toBeVisible({ timeout });
    await this.waitForLoadingToFinish();
  }

  protected async clickAfterLoading(locator: Locator) {
    await this.waitForLoadingToFinish();
    await locator.click();
  }

  protected async fillAfterLoading(locator: Locator, value: string) {
    await this.waitForLoadingToFinish();
    await locator.fill(value);
  }

  protected async checkAfterLoading(locator: Locator) {
    await this.waitForLoadingToFinish();
    await locator.check();
  }
}

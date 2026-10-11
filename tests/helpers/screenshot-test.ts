import { test as base, expect } from "@playwright/test";
import type { Locator, Page, TestInfo } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

// Folder containing the screenshots created by this fixture.
const screenshotsRoot = path.resolve(process.cwd(), "test-screenshots");

const actionMethods = new Set(["check", "clear", "click", "dblclick", "dragTo", "fill", "focus", "hover", "press", "pressSequentially", "selectOption", "selectText", "setChecked", "setInputFiles", "tap", "type", "uncheck"]);

const pageActionMethods = new Set(["goBack", "goForward", "goto", "reload"]);

const locatorFactoryMethods = new Set(["getByAltText", "getByLabel", "getByPlaceholder", "getByRole", "getByTestId", "getByText", "getByTitle", "locator"]);

function safeName(value: string): string {
  return value
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 140);
}

function createActionProxy<T extends object>(target: T, takeScreenshot: (actionName: string) => Promise<void>, isPage: boolean): T {
  return new Proxy(target, {
    get(currentTarget, property, receiver) {
      const value = Reflect.get(currentTarget, property, receiver);

      if (typeof value !== "function" || typeof property !== "string") {
        return value;
      }

      const isAction = isPage ? pageActionMethods.has(property) : actionMethods.has(property);
      const isFactory = isPage && locatorFactoryMethods.has(property);

      if (!isAction && !isFactory) {
        return value.bind(currentTarget);
      }

      // Locator factory methods are synchronous. They must return a Locator
      // immediately so assertions can receive a real Locator, not a Promise.
      if (isFactory) {
        return (...args: unknown[]) =>
          createActionProxy(value.apply(currentTarget, args) as Locator, takeScreenshot, false);
      }

      return async (...args: unknown[]) => {
        const result = await value.apply(currentTarget, args);
        await takeScreenshot(property);
        return result;
      };
    },
  });
}

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use, testInfo: TestInfo) => {
    // Each test gets a stable folder, so rerunning the same test replaces its old screenshots.
    const folderName = safeName(`${testInfo.project.name}-${testInfo.titlePath.join("-")}`);
    const screenshotDir = path.join(screenshotsRoot, folderName);
    await fs.rm(screenshotDir, { recursive: true, force: true });
    await fs.mkdir(screenshotDir, { recursive: true });

    let screenshotNumber = 0;
    const takeScreenshot = async (actionName: string) => {
      screenshotNumber += 1;
      const fileName = `${String(screenshotNumber).padStart(3, "0")}-${safeName(actionName)}.png`;
      const filePath = path.join(screenshotDir, fileName);

      await page.screenshot({ path: filePath, fullPage: true });
      await testInfo.attach(`step-${String(screenshotNumber).padStart(3, "0")}-${actionName}`, {
        path: filePath,
        contentType: "image/png",
      });
    };

    await use(createActionProxy(page, takeScreenshot, true));
  },
});

export { expect };

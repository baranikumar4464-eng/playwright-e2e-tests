import { test, expect } from "@playwright/test";
import constants from "../../data/constants.json";

test("Should demo Constants data", async ({ page }) => {
  page.goto("https://www.google.com/");
  console.log(`>>Constants data: ${JSON.stringify(constants.STATUSCODES)}`);
});

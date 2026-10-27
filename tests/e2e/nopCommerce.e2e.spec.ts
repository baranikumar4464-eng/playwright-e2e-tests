import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";
import HomePage from "../page-objects/nopCommerce.home.page";

test("Login to Nope Commerce web app", async ({ page }, testInfo) => {
  //Env config
  const envConif = testInfo.project.use as any;

  //Create an page object
  const homePage = new HomePage(page);

  //Login
  await homePage.loginToNopCommerceApp(envConif.nopCommerceWeb, process.env.TEST_USERNAME_NOP_COMEMRCE, process.env.TEST_PASSWORD_NOP_COMEMRCE);
});

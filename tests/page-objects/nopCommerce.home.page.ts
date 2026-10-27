import { expect, type Page } from "@playwright/test";
import BasePage from "./basepage";
import { log } from "../helpers/logger";

export default class HomePage extends BasePage {
  //Constructor
  constructor(page: Page) {
    super(page);
  }

  //elements
  get userNameInputBox() {
    return this.page.getByRole("textbox", { name: "Email:" });
  }
  get passwordInputBox() {
    return this.page.getByRole("textbox", { name: "Password:" });
  }
  get loginBtn() {
    return this.page.getByRole("button", { name: "Log in" });
  }

  //Page Actions
  async loginToNopCommerceApp(url: string, username: string, passwrod: string) {
    await log("info", `Login to ${url}`);
    //login
    await this.navigateTo(url);
    await this.typeInto(this.userNameInputBox, username);
    await this.typeInto(this.passwordInputBox, passwrod);
    await this.click(this.loginBtn);
    //Assert the url
    await expect(this.page).toHaveURL(`${url}/admin/`);
  }
}

/*
  await page.goto("https://admin-demo.nopcommerce.com/");
  await page.getByRole("textbox", { name: "Email:" }).fill("admin@yourstore.com");
  await page.getByRole("textbox", { name: "Password:" }).fill("admin");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page).toHaveURL("https://admin-demo.nopcommerce.com/admin/");
  */

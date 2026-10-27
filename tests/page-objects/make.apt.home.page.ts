import { expect, type Page } from "@playwright/test";
import { log } from "../helpers/logger";
import BasePage from "./basepage";

export default class MakeAppointment extends BasePage {
  // constructor
  constructor(page: Page) {
    super(page);
  }

  //elements
  get userNameInputBox() {
    return this.page.getByLabel("Username");
  }
  get passwordInputBox() {
    return this.page.getByLabel("Password");
  }
  get loginBtn() {
    return this.page.getByRole("button", { name: "Login" });
  }

  //Actions
  async loginToMakeAppointment(url: string, username: string, passwrod: string) {
    await log("info", `Login to ${url}`);
    //login
    await this.navigateTo(url);
    await expect(this.page).toHaveTitle("CURA Healthcare Service");
    await expect(this.page.locator("//h1")).toHaveText("CURA Healthcare Service");
    //CLick on the make appointment
    await this.page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(this.page.getByText("Please login to make appointment.")).toBeVisible();
    await this.typeInto(this.userNameInputBox, username);
    await this.typeInto(this.passwordInputBox, passwrod);
    await this.click(this.loginBtn);
    //Assert the page and url
    await expect(this.page.locator("h2")).toContainText("Make Appointment");
    await expect(this.page).toHaveURL(`${url}#appointment`);
  }
}

/*
test("test", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page.locator("h1")).toBeVisible();
  await page.getByRole("link", { name: "Make Appointment" }).click();

  await page.getByLabel("Username").fill("John Doe");

  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();
});
*/

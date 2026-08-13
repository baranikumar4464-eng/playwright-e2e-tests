/*
✅test.only("Should demo locators", async ({ page }) => 
✅page.getBy*()' and `page. locator()' methods returns the 'locator' object
✅The above methods not to be 'awaited'
✅The type of locator is an `object'
✅Locators are LAZY until an action is fired on them
*/

import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // 1. Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Click on the Make Appointment
  //   let makeAppmtBtn = page.getBytBvRole("link", { name: "Invalid Locator" });
  let makeAppmtBtn = page.getByRole("link", { name: "Make Appointment" });

  console.log(
    `>>type of locator is ${typeof makeAppmtBtn}, /n the value of the locator is ${JSON.stringify(makeAppmtBtn)}`,
  );
});

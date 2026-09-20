import { test, expect } from "@playwright/test";
/*
* ELEMENT: Dropdown

* @actions
✅Assert default option
✅Select by:
* - label
* - Index
✅VAssert the count
✅4. Get all dropdown values
*/
test("should pass dropdown", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();

  await expect(page.getByText("Please login to make appointment.")).toBeVisible();
  await page.getByLabel("Username").fill("John Doe");
  await page.getByPlaceholder("Password").nth(1).fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).press("Enter");

  //dropdown
  await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center");
  await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");
  await page.getByLabel("Facility").selectOption({ index: 0 });
  await page.getByLabel("Facility").selectOption({ label: "Seoul CURA Healthcare Center" });

  //Assertion
  let drpdwncount = page.getByLabel("Facility").locator("option");
  await expect(drpdwncount).toHaveCount(3);

  //collecting drop down values
  let listEle = await page.getByLabel("Facility").all();

  //Creating Array to store elements
  let dpdwnOptions = [];

  for (let ele of listEle) {
    let eleTxt = await ele.textContent();
    dpdwnOptions.push(eleTxt);
  }

  console.log(dpdwnOptions);

  await page.close();
});

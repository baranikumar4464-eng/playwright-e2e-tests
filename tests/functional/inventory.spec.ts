import { test, expect } from "@playwright/test";

/*
 * Scenario:
 * 1. Login as standard user
 * 2. Get a list of products with its price
 * 3. Assert that all products have non-zero dollar value
 * */

test.describe("Inventory features", () => {
  test.beforeEach("Login wth valid credentials", async ({ page }) => {
    //launching url
    await page.goto("https://www.saucedemo.com/");
    //login with creds
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.waitForTimeout(3000);
    await page.locator('[data-test="login-button"]').click();
    //validate logged in successfully
    // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL(/.*\/inventory/);
    await page.waitForTimeout(3000);
  });

  test("Should list the items with non-zero price", async ({ page }) => {
    //To get the list of products
    let productsEle = await page.locator(".inventory_item");
    await expect(productsEle).toHaveCount(6);

    //To get product name and prices
    let totalProducts = await productsEle.count();

    let priceEle = [];

    for (let i = 0; i < totalProducts; i++) {
      let eleNode = productsEle.nth(i);

      //Product name
      let productName = await eleNode.locator(".inventory_item_name ").innerText();
      //Product prizce
      let productPrice = await eleNode.locator(".inventory_item_price").innerText();

      console.log(`Name of the product: ${productName} and Price is ${productPrice}`);
      priceEle.push(productPrice);
    }

    console.log(priceEle);

    /*
     * [$29.99,$9.99, $15.99, $49.99, $7.99,$15.99]
     * 1. Replace all $ with ""
     * 2. Compare the price which should be > 0
     */
    let priceArrNum = priceEle.map((item) => parseFloat(item.replace("$", "")));
    console.log(priceArrNum);
  });
});

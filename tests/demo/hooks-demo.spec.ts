import { test, expect } from "@playwright/test";

test.beforeAll("beforeAll file scope", () => {
  console.log("beforeAll file scope");
});

test.beforeEach("beforeEach file scope", () => {
  console.log("beforeEach file scope");
});

test.afterEach("afterEach file scope", () => {
  console.log("afterEach file scope");
});

test.afterAll("afterAll file scope", () => {
  console.log("afterAll file scope");
});

test.describe("Testing hooks: Test suite 1", () => {
  test.beforeAll("beforeAll", () => {
    console.log("Suite1: beforeAll describe scope");
  });

  test.beforeEach("beforeEach", () => {
    console.log("Suite1: beforeEach describe scope");
  });

  test("test One", async ({ page }) => {
    console.log(`>> Running test one ...`);
    await page.goto("https://www.google.com");
  });

  test("test two", async ({ page }) => {
    console.log(`>> Running test two ...`);
    await page.goto("https://www.google.com");
  });

  test("test three", async ({ page }) => {
    console.log(`>> Running test three ...`);
    await page.goto("https://www.google.com");
  });
});

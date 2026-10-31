import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixture.ts";
import path from "path";

console.log("--- RUNNING IN TEST ENVIRONMENT ---");
export default defineConfig<EnvConfig>({
  ...baseConfig, //load all existing config values
  timeout: 300_000,
  expect: {
    ...baseConfig.expect,
    timeout: 45_000,
  },
  globalSetup: "../tests/helpers/global-setup.ts",
  globalTeardown: "../tests/helpers/global-teardown.ts",
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use,
    actionTimeout: 45_000,
    navigationTimeout: 90_000,
    envName: "test",
    appUrl: "https://katalon-demo-cura.herokuapp.com/",
    nopCommerceWeb: "https://admin-demo.nopcommerce.com/",
    "auto-quote-qa": "https://memberapps.qa.acg.aaa.com/auto-quote/auto-quote?p=auto",
    dbConfig: {
      server: "",
      dbname: "",
      connnectionStr: "",
    },
  },
});

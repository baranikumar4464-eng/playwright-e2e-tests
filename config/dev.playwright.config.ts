import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixture.ts";
import path from "path";

console.log("--- RUNNING IN Dev ENVIRONMENT ---");
export default defineConfig<EnvConfig>({
  ...baseConfig, //load all existing config values
  globalSetup: "../tests/helpers/global-setup.ts",
  globalTeardown: "../tests/helpers/global-teardown.ts",
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use,
    envName: "dev",
    appUrl: "https://www.google.com",
    dbConfig: {
      server: "",
      dbname: "",
      connnectionStr: "",
    },
  },
});

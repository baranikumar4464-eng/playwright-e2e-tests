# Instructions and Notes

## In this session ...

** Handling Environment Specific Data **

Steps*To_Follow *:

** Create a config fixture **:
Create a new fixture
Follow the docs and

1. Define EnvConfig type and target fields
2. [xRule] :

The existing

1.
2.

config-fixtures.ts'

under

/helpers

Define an option and provide a default value.

test

function will extend the custom variables

1.
2.
3.

4.
5.

** Create a new config **:
Create a new config file
[Rule]: There should be one function that has to
Change the root config export to
`export default defineConfig({})' -> `export const baseConfig = defineConfig({})'
Import
Extend the root config setting with

config'

test.playwright.config.ts'

`/config
export default defineConfig'

under

folder

1.

root

config

The new

---

import { baseConfig } from " .. /playwright.config.ts";
spread operator

will extend the old config settings

### Session 2: Run Test With New Env Config

EnvConfig
Extend the new config to extend the
Add the custom env variables under
https://katalon-demo-cura. herokuapp. com/
Run the command below and confirm the number of tests
npx playwright test -- config=config/test.playwright.config.ts -- list'

- why?

1.
2.
3.

Import the

from helper folder
EnvConfig
object to the config

type

use

1. e.g.

2.

3.

4.

You would see

1. Update

2.
3.
4.
5.

Error: No tests found
testDir
Use the variable in
Add a new key in
Try with new
Done!

spec
scripts

-- config'

option

env

file
section with
config file and run and prove it works

---

## Different Environment Data Handling

1. Create a config fixture which can be used across different environment

```ts
// tests/helpers/config-fixtures.ts
import { test as base } from "@playwright/test";

export type EnvConfig = {
  envName: string;
  appURL: string;
  dbConfig: {};
};

export const test = base.extend<EnvConfig>({
  // Define options and provide default values.
  // We can later override them in the config.
  envName: ["provide-a-val", { option: true }],
  appURL: ["provide-a-val", { option: true }],
  dbConfig: [{}, { option: true }],
});
```

2. Create a new config file

```ts
// config/test.playwright.config.ts

import { baseConfig } from "../playwright.config.ts";
import { defineConfig, devices } from "@playwright/test";
import type { EnvConfig } from "../tests/helpers/config-fixtures.ts";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<EnvConfig>({
  ...baseConfig,
  testDir: "../tests", // Fix path from config folder
  use: {
    ...baseConfig.use, // Required
    envName: "test",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    dbConfig: {
      dbname: "",
      host: "test",
      port: "1234",
    },
  },
});
```

3. Use the variable in a test

```ts
// tests/functional/make-apptmnt.spec.ts
test.beforeEach("Launch Homepage", async ({ page }, testInfo) => {
  // Access the custom env specific value as below
  const envConfig = testInfo.project.use as any; // Note: project and use are just objects ✅ // @ts-ignore
  console.log(`>>> Final Config: ${JSON.stringify(testInfo.config)}`);
  console.log(`>>> Custom Env Config: ${JSON.stringify(envConfig.envName)}`);

  // Launch Home page
  await page.goto(envConfig.appURL);
  // Rest of the steps
});
```

4. Done! 🎉

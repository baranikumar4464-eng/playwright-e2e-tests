import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";
import MakeAppointment from "../page-objects/make.apt.home.page";

test("Login to Cura Make Appointment web app", async ({ page }, testInfo) => {
  //Env config
  const envConif = testInfo.project.use as any;

  //Create an page object
  const makeAppointment = new MakeAppointment(page);

  //Login
  await log("info", "Page object 1 for login started");
  await makeAppointment.loginToMakeAppointment(envConif.appUrl, process.env.TEST_USERNAME_CURA, process.env.TEST_PASSWORD_CURA);
});

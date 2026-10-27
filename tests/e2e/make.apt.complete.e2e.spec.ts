import { test } from "@playwright/test";
import path from "path";

import fileHelpers from "../helpers/file-helpers";
import MakeAppointment from "../page-objects/make.apt.home.page";
import AppointmentPage, { type AppointmentData } from "../page-objects/make.apt.form.page";

const csvPath = path.resolve(process.cwd(), "data", "demo", "make-apt-test-data.csv");

const appointmentData = fileHelpers.readCSV(csvPath) as AppointmentData[];

test.describe("CURA appointment booking", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // Matches your current approach to reading project configuration.
    const envConfig = testInfo.project.use as typeof testInfo.project.use & {
      appUrl: string;
    };

    const username = process.env.TEST_USERNAME_CURA;
    const password = process.env.TEST_PASSWORD_CURA;

    if (!username || !password) {
      throw new Error("TEST_USERNAME_CURA and TEST_PASSWORD_CURA must be configured.");
    }

    const loginPage = new MakeAppointment(page);

    await loginPage.loginToMakeAppointment(envConfig.appUrl, username, password);
  });

  for (const data of appointmentData) {
    test(`${data.testId}: book ${data.facility} with ${data.hcp}`, async ({ page }) => {
      const appointmentPage = new AppointmentPage(page);

      const readmission = true;
      const comment = `Appointment booking - ${data.testId}`;

      await appointmentPage.fillAppointmentForm(data, readmission, comment);

      await appointmentPage.submitAppointment();

      await appointmentPage.verifyConfirmation(data, readmission, comment);
    });
  }
});

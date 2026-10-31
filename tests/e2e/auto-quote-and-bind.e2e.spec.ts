import { test } from "@playwright/test";
import { loadAutoQuoteTestData } from "../helpers/auto-quote-test-data";
import AutoQuoteAddressPage from "../page-objects/auto-quote-address.page";
import AutoQuoteApplicantPage from "../page-objects/auto-quote-applicant.page";
import AutoQuoteCoveragePage from "../page-objects/auto-quote-coverage.page";
import AutoQuoteDiscountsPage from "../page-objects/auto-quote-discounts.page";
import AutoQuoteDriverDetailsPage from "../page-objects/auto-quote-driver-details.page";
import AutoQuoteTelematicsPage from "../page-objects/auto-quote-telematics.page";
import AutoQuoteVehiclePage from "../page-objects/auto-quote-vehicle.page";

test.describe("Auto Quote and Bind", () => {
  test("completes the Auto Quote flow for each Excel data row", async ({ page }, testInfo) => {
    const testDataRows = await loadAutoQuoteTestData();
    const projectUse = testInfo.project.use as typeof testInfo.project.use & {
      "auto-quote-qa": string;
    };
    const quoteUrl = projectUse["auto-quote-qa"];
    const applicantPage = new AutoQuoteApplicantPage(page);
    const addressPage = new AutoQuoteAddressPage(page);
    const vehiclePage = new AutoQuoteVehiclePage(page);
    const driverDetailsPage = new AutoQuoteDriverDetailsPage(page);
    const telematicsPage = new AutoQuoteTelematicsPage(page);
    const discountsPage = new AutoQuoteDiscountsPage(page);
    const coveragePage = new AutoQuoteCoveragePage(page);

    for (const data of testDataRows) {
      await test.step(`Auto Quote data: ${data.testId}`, async () => {
        await applicantPage.startQuote(quoteUrl);
        await applicantPage.completeApplicantDetails(data);
        await addressPage.enterAddress(data.address);
        await vehiclePage.addVehicle(data.vin);
        await driverDetailsPage.completeDriverDetails();
        await telematicsPage.continueToDiscounts();
        await discountsPage.completeDiscountQuestions();
        await coveragePage.verifyPreQuoteSummary();
      });
    }
  });
});

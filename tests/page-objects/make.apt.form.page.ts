import { expect, type Page } from "@playwright/test";
import BasePage from "./basepage";

export type AppointmentData = {
  testId: string;
  facility: string;
  hcp: string;
  visitDate: string;
};

export default class AppointmentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Elements
  get facilityDropdown() {
    return this.page.getByLabel("Facility");
  }

  get readmissionCheckbox() {
    return this.page.getByRole("checkbox", {
      name: "Apply for hospital readmission",
    });
  }

  healthcareRadio(program: string) {
    return this.page.getByRole("radio", {
      name: program,
      exact: true,
    });
  }

  get visitDateInput() {
    return this.page.getByRole("textbox", {
      name: "Visit Date (Required)",
    });
  }

  get commentInput() {
    return this.page.getByRole("textbox", { name: "Comment" });
  }

  get bookAppointmentButton() {
    return this.page.getByRole("button", {
      name: "Book Appointment",
    });
  }

  // Actions
  async fillAppointmentForm(data: AppointmentData, readmission: boolean, comment: string) {
    await this.selectDropdown(this.facilityDropdown, data.facility);
    await this.setCheckbox(this.readmissionCheckbox, readmission);
    await this.selectRadioButton(this.healthcareRadio(data.hcp));

    // CSV uses DD-MM-YYYY; the form uses DD/MM/YYYY.
    // await this.typeInto(this.visitDateInput, data.visitDate.replace(/-/g, "/"));
    await this.visitDateInput.pressSequentially(data.visitDate);

    // Move focus away from the date picker.
    await this.click(this.commentInput);
    await this.typeInto(this.commentInput, comment);
  }

  async submitAppointment() {
    await this.click(this.bookAppointmentButton);
  }

  // Verification
  async verifyConfirmation(data: AppointmentData, readmission: boolean, comment: string) {
    await expect(
      this.page.getByRole("heading", {
        name: "Appointment Confirmation",
        exact: true,
      }),
    ).toBeVisible();

    await expect(this.page.locator("#facility")).toHaveText(data.facility);

    await expect(this.page.locator("#hospital_readmission")).toHaveText(readmission ? "Yes" : "No");

    await expect(this.page.locator("#program")).toHaveText(data.hcp);

    await expect(this.page.locator("#visit_date")).toHaveText(data.visitDate.replace(/-/g, "/"));

    await expect(this.page.locator("#comment")).toHaveText(comment);
  }
}

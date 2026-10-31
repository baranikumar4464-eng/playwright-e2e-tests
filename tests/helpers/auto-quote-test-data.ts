import ExcelJS from "exceljs";
import path from "path";

export type AutoQuoteTestData = {
  testId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  vin: string;
  address: string;
  email: string;
  phone: string;
};

function formatDateOfBirth(value: unknown, rowNumber: number): string {
  if (value instanceof Date) {
    return `${String(value.getUTCMonth() + 1).padStart(2, "0")}/${String(value.getUTCDate()).padStart(2, "0")}/${value.getUTCFullYear()}`;
  }

  const rawValue = String(value ?? "").trim();
  const match = rawValue.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) {
    throw new Error(`Excel row ${rowNumber}: DOB must be an Excel date or use MM/DD/YYYY format.`);
  }

  const [, monthText, dayText, yearText] = match;
  const month = Number(monthText);
  const day = Number(dayText);
  const year = Number(yearText);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new Error(`Excel row ${rowNumber}: DOB "${rawValue}" is not a valid date.`);
  }

  return `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`;
}

function cellText(value: ExcelJS.CellValue): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") {
    throw new Error("Excel test data cells must contain plain text or date values.");
  }

  return String(value).trim();
}

export async function loadAutoQuoteTestData(): Promise<AutoQuoteTestData[]> {
  const workbookPath = path.resolve(
    process.cwd(),
    process.env.AUTO_QUOTE_DATA_FILE ?? "data/auto-quote-test-data.xlsx",
  );
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(workbookPath);
  } catch (error) {
    throw new Error(
      `Unable to read the Auto Quote Excel workbook at "${workbookPath}". Set AUTO_QUOTE_DATA_FILE to its path.`,
      { cause: error },
    );
  }

  const worksheetName = process.env.AUTO_QUOTE_WORKSHEET;
  const worksheet = worksheetName ? workbook.getWorksheet(worksheetName) : workbook.worksheets[0];
  if (!worksheet) {
    throw new Error(
      worksheetName
        ? `The Auto Quote workbook does not contain a worksheet named "${worksheetName}".`
        : "The Auto Quote workbook does not contain a worksheet.",
    );
  }

  const headers = new Map<string, number>();
  worksheet.getRow(1).eachCell((cell, columnNumber) => {
    headers.set(cellText(cell.value).toLowerCase(), columnNumber);
  });

  const requiredHeaders = ["first name", "last name", "dob", "vin", "address"];
  const missingHeaders = requiredHeaders.filter((header) => !headers.has(header));
  if (missingHeaders.length > 0) {
    throw new Error(`Auto Quote worksheet is missing required columns: ${missingHeaders.join(", ")}.`);
  }

  const valueFor = (row: ExcelJS.Row, header: string): string => {
    const columnNumber = headers.get(header);
    return columnNumber === undefined ? "" : cellText(row.getCell(columnNumber).value);
  };

  const records: AutoQuoteTestData[] = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const firstName = valueFor(row, "first name");
    const lastName = valueFor(row, "last name");
    const dobValue = row.getCell(headers.get("dob")!).value;
    const vin = valueFor(row, "vin");
    const address = valueFor(row, "address");
    if (![firstName, lastName, cellText(dobValue), vin, address].some(Boolean)) return;

    const missingValues = [
      ["First Name", firstName],
      ["Last Name", lastName],
      ["DOB", cellText(dobValue)],
      ["VIN", vin],
      ["Address", address],
    ].filter(([, value]) => !value);
    if (missingValues.length > 0) {
      throw new Error(
        `Excel row ${rowNumber} is missing required values: ${missingValues.map(([name]) => name).join(", ")}.`,
      );
    }

    records.push({
      testId: valueFor(row, "test id") || `row-${rowNumber}`,
      firstName,
      lastName,
      dateOfBirth: formatDateOfBirth(dobValue, rowNumber),
      vin,
      address,
      email: valueFor(row, "email") || process.env.AUTO_QUOTE_EMAIL || "auto-quote@example.com",
      phone: valueFor(row, "phone") || process.env.AUTO_QUOTE_PHONE || "9999999999",
    });
  });

  if (records.length === 0) {
    throw new Error(`Auto Quote worksheet "${worksheet.name}" does not contain any test data rows.`);
  }

  return records;
}

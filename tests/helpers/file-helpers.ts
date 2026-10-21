/* Reads the CSV file
 * @param filepath
 * @returns Array of objects
 */

import fs from "fs";
import { parse } from "csv-parse/sync";

function readCSV(filepath: string): any[] {
  const csvDataStr = fs.readFileSync(filepath, { encoding: "utf-8" });
  const csvDataArr = parse(csvDataStr, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  return csvDataArr;
}

export default { readCSV };

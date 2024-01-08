import puppeteer from "puppeteer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import Data_releve from "@/models/note_1/Data_releve";

const compile = async function (templateName: string, data: Data_releve) {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);
  const html = fs.readFileSync(filePath, "utf-8");
  return handlebars.compile(html)(data);
};

handlebars.registerHelper("formatNumberLocal", (nb: string) => {
  if (nb) return nb.replace(".", ",");
});

handlebars.registerHelper(
  "notePonderee",
  (note: string, coefficient: string) => {
    return (parseFloat(note) * parseFloat(coefficient))
      .toFixed(2)
      .replace(".", ",");
  }
);

handlebars.registerHelper("getArrayIndexValue", (index, array) => {
  return array[index];
});

handlebars.registerHelper("formatToISONumber", (nbr: string) => {
  if (nbr) return nbr.replace(",", ".");
});

export default async function generatePDF(data: any, hbsFileName: string) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Use Handlebars.js to generate the HTML
  const content = await compile(hbsFileName, data);
  await page.setContent(content, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");
  const pdf = await page.pdf({
    width: `210mm`,
    height: `297mm`,
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  return pdf;
}

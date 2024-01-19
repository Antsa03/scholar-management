import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import generatePDF from "./pdfGenerator";
import { convertPdfToDocx } from "./PdftoDocx";

handlebars.registerHelper(
  "notePonderee",
  (note: string, coefficient: string) => {
    return (
      parseFloat(note.replace(",", ".")) *
      parseFloat(coefficient.replace(",", "."))
    )
      .toFixed(2)
      .replace(".", ",");
  }
);

handlebars.registerHelper("getArrayIndexValue", (index, array) => {
  return array[index];
});

export const generateDocx = async (data: any, hbsFileName: string) => {
  const pdfPath = path.join(process.cwd(), "output.pdf"); // Specify the path for the PDF file
  const docxPath = path.join(process.cwd(), "output.docx"); // Specify the path for the DOCX file

  const pdf = await generatePDF(data, hbsFileName); // Generate the PDF as a blob

  fs.writeFileSync(pdfPath, pdf); // Save the PDF blob as a file at the specified path

  await convertPdfToDocx(pdfPath, docxPath);

  const docxFile = fs.readFileSync(docxPath);
  fs.unlinkSync(pdfPath);
  fs.unlinkSync(docxPath);
  return docxFile;
};

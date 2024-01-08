import { PythonShell } from "python-shell";
import path from "path";

export const convertPdfToExcel = async (pdfPath: string, excelPath: string) => {
  const options = {
    pythonPath: "python",
    pythonOptions: ["-u"],
    scriptPath: path.join(process.cwd(), "python"),
    args: [pdfPath, excelPath],
  };

  await PythonShell.run("convert_pdf_excel.py", options);
};

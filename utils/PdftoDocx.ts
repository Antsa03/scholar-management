import { PythonShell } from "python-shell";
import path from "path";

export const convertPdfToDocx = async (pdfPath: string, docxPath: string) => {
  const options = {
    pythonPath: "python",
    pythonOptions: ["-u"],
    scriptPath: path.join(process.cwd(), "python"),
    args: [pdfPath, docxPath],
  };

  await PythonShell.run("convert_pdf_docx.py", options);
};

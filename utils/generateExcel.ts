import JsReport from "jsreport";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

handlebars.registerHelper("formatToISONumber", (nbr: string) => {
  if (nbr) return nbr.replace(",", ".");
});

handlebars.registerHelper(
  "notePonderee",
  (note: string, coefficient: string) => {
    return (
      parseFloat(note.replace(",", ".")) *
      parseFloat(coefficient.replace(",", "."))
    );
  }
);

handlebars.registerHelper("getArrayIndexValue", (index, array) => {
  return array[index];
});

handlebars.registerHelper("firstElement", (array) => {
  return array[0].unite_enseignements;
});

handlebars.registerHelper("TailleTab", (array: any[]) => {
  return array.length + 1;
});

const compile = async function (templateName: string, data: any) {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);
  const html = fs.readFileSync(filePath, "utf-8");
  return handlebars.compile(html)(data);
};

handlebars.registerHelper("breaklines", function (text) {
  text = handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, "<br>");
  return new handlebars.SafeString(text);
});

export default async function generateExcel(data: any, hbsFileName: string) {
  const jsreportInstance = JsReport();
  await jsreportInstance.init();
  try {
    const content = await compile(hbsFileName, data);
    const result = await jsreportInstance.render({
      template: {
        content: content,
        engine: "none",
        recipe: "html-to-xlsx",
      },
    });

    const buffer = result.content;
    await jsreportInstance.close();
    return buffer;
  } catch (error) {
    await jsreportInstance.close();
    console.error(error);
  }
}

"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

type ExcelData = {
  nom: string;
  code_matiere: string;
  note_matiere: string;
};

function NoteFromExcel() {
  const [excelData, setExcelData] = useState<any>();

  function filterEmptyRows(jsonData: any[]): any[] {
    return jsonData.filter(
      (row: any[]) =>
        !row.every(
          (cell: any) => cell === "" || cell === null || cell === undefined
        )
    );
  }

  function findStartRow(jsonData: any[]): number {
    for (let i = 0; i < jsonData.length; i++) {
      if (
        jsonData[i][0] === "Noms et prénoms" ||
        jsonData[i][0].toLowerCase().includes("nom et prénoms") ||
        jsonData[i][0].toLowerCase().includes("prenom")
      ) {
        return i + 1;
      }
    }
    return 0;
  }

  function findCodeMatIndexRow(jsonData: any[]): number {
    for (let i = 0; i < jsonData.length; i++) {
      if (
        jsonData[i][0] === "Code matière" ||
        jsonData[i][0].toLowerCase().includes("code matière") ||
        jsonData[i][0].toLowerCase().includes("code mat")
      ) {
        return i;
      }
    }
    return 0;
  }

  function shouldSkipColumn(title: any): boolean {
    return (
      title === undefined ||
      title === "" ||
      title.startsWith("P_") ||
      title.includes("Moy") ||
      title.includes("Modules à rattraper")
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const excelFile = new Uint8Array(event.target!.result as ArrayBuffer);
      const workbook = XLSX.read(excelFile, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      let jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 1,
      }) as any;

      // Filter out empty rows == Remove empty rows from jsonData
      jsonData = filterEmptyRows(jsonData);

      // Find the start row for the data
      const startRow = findStartRow(jsonData);

      // Find the index row of the "Code matière"
      let indexCodeMat: number = findCodeMatIndexRow(jsonData);

      // Get the ROW VALUE of the "Code matière"
      let infoTitles = jsonData[indexCodeMat];
      let data: ExcelData[] = [];

      for (let i = startRow; i < jsonData.length; i++) {
        let rowData = jsonData[i];
        let row = rowData;

        for (let j = 1; j < row.length; j++) {
          let title = infoTitles[j];
          let note = rowData[j];

          if (shouldSkipColumn(title)) {
            continue;
          }

          let obj: ExcelData = {
            nom: row[0],
            code_matiere: title,
            note_matiere: note,
          };
          data.push(obj);
        }
      }

      setExcelData(data);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
      <pre>{JSON.stringify(excelData, null, 2)}</pre>
    </div>
  );
}

export default NoteFromExcel;

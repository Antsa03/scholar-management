"use client";
import Noter_1 from "@/models/note_1/Noter_1";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import noteJson from "@/public/json/note_1.json";

function NoteExcelToBd() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const fetchEtudiants = async () => {
    try {
      const response = await fetch("/api/utilisateur/etudiant");
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const [notes, setNotes] = useState<Noter_1[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 1,
      }) as any[][];

      const newNotes: Noter_1[] = [];

      jsonData.forEach((row: any[]) => {
        const note: Noter_1 = {
          id_noter_1: row[0] + "-" + row[2] + "-" + row[3],
          id_calendrier_2: row[1],
          num_matricule: row[2],
          code_matiere: row[3],
          note_matiere: row[4] + "",
        };

        newNotes.push(note);
      });

      setNotes(newNotes);
    };

    reader.readAsArrayBuffer(file);
  };

  const checkNumMatricule = () => {
    const etudiantNumMatricules = etudiants.map(
      (etudiant) => etudiant.num_matricule
    );
    notes.forEach((note) => {
      if (!etudiantNumMatricules.includes(note.num_matricule)) {
        console.log(note.num_matricule);
      }
    });
  };

  const saveData = async () => {
    if (notes.length > 0) {
      const response = await fetch("/api/create-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      });
      if (response.ok) alert("Notes créer avec succès");
      else console.log(response);
    } else alert("Notes non définis");
  };

  const deleteNote = async () => {
    if (notes.length > 0) {
      notes.forEach(async (note) => {
        const response = await fetch(`/api/note_1/delete/${note.id_noter_1}`, {
          method: "DELETE",
        });
        if (response.ok) console.log("Note supprimées");
      });
    } else alert("Notes non définis");
  };

  const handleArrangeNote = () => {
    const newNotes: Noter_1[] = [];
    noteJson.forEach((note) => {
      const note_data: Noter_1 = {
        id_noter_1: note.id_noter_1,
        id_calendrier_2: note.id_calendrier_2,
        num_matricule: note.num_matricule,
        code_matiere: note.code_matiere,
        note_matiere: note.note_matiere + "",
      };
      newNotes.push(note_data);
    });
    setNotes(newNotes);
  };
  useEffect(() => {
    handleArrangeNote();
  }, []);
  return (
    <div>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />{" "}
      <br />
      <button onClick={() => saveData()}>Save note</button> <br />
      <button onClick={() => checkNumMatricule()}>
        Check num_matricule
      </button>{" "}
      <br />
      <button onClick={() => deleteNote()}>Delete</button>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}

export default NoteExcelToBd;

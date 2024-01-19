"use client";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { useParams } from "next/navigation";
import Note_Liste from "@/views/note/calendrier_2/Note_Liste";

function Liste_note_excel() {
  const params = useParams();
  const [liste_note, setListeNote] = useState<any[]>();
  const fetchListeNote = async () => {
    try {
      const response = await fetch(`/api/xlsx/${params?.id_calendrier_2}`);
      const data = await response.json();
      setListeNote(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListeNote();
  }, [params?.id_calendrier_2]);

  const generateExcel = async () => {
    try {
      if (!liste_note) return;
      const response = await fetch(
        `/api/xlsx/generate/${params?.id_calendrier_2}`
      );
      const excelBlob = await response.blob();
      alert("Excel générer avec succès");
      saveAs(excelBlob, `liste de note-${params?.id_calendrier_2}.xlsx`);
    } catch (error) {
      console.error(error);
    }
  };

  if (liste_note)
    return <Note_Liste liste_note={liste_note} generateExcel={generateExcel} />;
  else <h1>Aucun donnée à afficher</h1>;
}

export default Liste_note_excel;

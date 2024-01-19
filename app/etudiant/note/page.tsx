"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Note_liste from "@/views/etudiant/note/Note_liste";
import { saveAs } from "file-saver";
import Etudiant_liste_note from "@/models/etudiant/note/Etudiant_liste_note";
import { useRouter } from "next/navigation";

function EtudiantListeNote() {
  const router = useRouter();
  const { data: session }: any = useSession();
  const [notes, setNotes] = useState<Etudiant_liste_note[]>([]);
  const fetchNotesEtudiant = async () => {
    try {
      const response = await fetch(`/api/etudiant/note/${session?.user.id}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPdf = async (note: Etudiant_liste_note) => {
    try {
      const response = await fetch(
        `/api/etudiant/pdf/releve_note/${note.num_matricule}/${note.id_calendrier_2}/generate`
      );
      const pdfBlob = await response.blob();
      saveAs(
        pdfBlob,
        `releve-note-${note.num_matricule}-${note.designation_niveau}-S${note.semestre}.pdf`
      );
      alert("PDF généré et enregistré avec succès !");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la génération du PDF :",
        error
      );
    }
  };

  useEffect(() => {
    if (session) fetchNotesEtudiant();
  }, [session]);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <button
        onClick={() => router.push("/etudiant/accueil")}
        className="-text--text-blue-color text-lg self-end block underline"
      >
        Accueil
      </button>
      <Note_liste notes={notes} save={downloadPdf} />
    </div>
  );
}

export default EtudiantListeNote;

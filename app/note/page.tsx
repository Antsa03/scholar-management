"use client";
import Noter_1_liste from "@/models/note_1/listage-note/Note_listage";
import NoteList from "@/views/note/NoteList";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface Search {
  search: string;
  code_matiere: string;
}
function Note() {
  const [noter_1, setNoter_1] = useState<Noter_1_liste[]>([]);
  const fetchNoter_1 = async () => {
    try {
      const response = await fetch("/api/note_1/liste");
      const data = await response.json();
      setNoter_1(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNoter_1();
  }, []);

  const handleDelete = async (id_noter_1: string) => {
    try {
      const result = await Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimez-le!",
        cancelButtonText: "Non, annulez!",
        // customClass: "custom-alert",
      });
      if (result.isConfirmed) {
        const response = await fetch(`/api/note_1/delete/${id_noter_1}`, {
          method: "DELETE",
        });
        if (response.ok) {
          Swal.fire("Supprimé!", "La note a été supprimée.", "success");
          fetchNoter_1();
        } else {
          Swal.fire("Annulé", "Echec de la suppression!", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const search_form = useForm<Search>({
    defaultValues: {
      search: "",
      code_matiere: "",
    },
  });

  const handleRecherche: SubmitHandler<Search> = async (search) => {
    try {
      const response = await fetch("/api/recherche/note_1/liste-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      });
      const data = await response.json();
      setNoter_1(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteList
      noter_1={noter_1}
      handleDelete={handleDelete}
      register={search_form.register}
      handleSubmit={search_form.handleSubmit(handleRecherche)}
      listAll={fetchNoter_1}
    />
  );
}

export default Note;

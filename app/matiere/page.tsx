"use client";
import Matiere from "@/models/enseignement/Matiere";
import { showSwal } from "@/utils/swal";
import MatiereList from "@/views/matiere/MatiereList";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function MatierePage() {
  const [matieres, setMatieres] = useState<Array<Matiere>>([]);

  const fetchMatieres = async () => {
    try {
      const response = await fetch("/api/enseignement/matiere");
      const data = await response.json();
      setMatieres(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMatieres();
  }, []);

  const handleDelete = async (code_matiere: string) => {
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
        const response = await fetch(
          `/api/enseignement/matiere/delete/${code_matiere}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal(
            "Supprimé!",
            "La matière a été supprimée avec succès.",
            "success"
          );
          fetchMatieres();
        } else {
          showSwal("Annulé", "Echec de la suppression!", "error");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [search_value, setSearch_value] = useState("");
  const fetchRecherche_matiere = async () => {
    try {
      const response = await fetch("/api/recherche/enseignement/matiere", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_value),
      });
      const data = await response.json();
      setMatieres(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_matiere = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchMatieres();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_matiere();
  };

  return (
    <MatiereList
      matieres={matieres}
      handleDelete={handleDelete}
      handleRecherche_matiere={handleRecherche_matiere}
      handleRecherche={handleRecherche}
    />
  );
}

export default MatierePage;

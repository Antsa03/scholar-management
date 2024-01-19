"use client";
import React, { useEffect, useState } from "react";
import UEList from "@/views/unite_enseignement/UEList";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import Swal from "sweetalert2";
import { showSwal } from "@/utils/swal";

function UniteEnseignement() {
  const [unite_enseignements, setUnite_enseignements] = useState<
    Array<Unite_enseignement>
  >([]);
  const fetchUniteEnseignement = async () => {
    try {
      const response = await fetch("/api/enseignement/unite_enseignement");
      const data = await response.json();
      setUnite_enseignements(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUniteEnseignement();
  }, []);

  const handleDelete = async (id_ue: string) => {
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
          `/api/enseignement/unite_enseignement/delete/${id_ue}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal(
            "Supprimé!",
            "L'unité d'enseignement a été supprimé.",
            "success"
          );
          fetchUniteEnseignement();
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
  const fetchRecherche_ue = async () => {
    try {
      const response = await fetch(
        "/api/recherche/enseignement/unite_enseignement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(search_value),
        }
      );
      const data = await response.json();
      setUnite_enseignements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_ue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchUniteEnseignement();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_ue();
  };

  return (
    <UEList
      unite_enseignements={unite_enseignements}
      handleDelete={handleDelete}
      handleRecherche_ue={handleRecherche_ue}
      handleRecherche={handleRecherche}
    />
  );
}

export default UniteEnseignement;

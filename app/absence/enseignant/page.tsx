"use client";
import Absence_enseignant from "@/models/absence/enseignant/listage/Absence_enseignant";
import { showSwal } from "@/utils/swal";
import AbsenceEnseignant_List from "@/views/absence/enseignant/AbsenceEnseignant_List";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AbsenceEnseignant() {
  const [absence_enseignants, setAbsence_enseignants] = useState<
    Array<Absence_enseignant>
  >([]);
  const fetchAbsence_enseignants = async () => {
    try {
      const response = await fetch("/api/absence/enseignant");
      const data = await response.json();
      setAbsence_enseignants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbsence_enseignants();
  }, []);

  const handleDelete = async (id_calendrier_4: string) => {
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
          `/api/absence/enseignant/calendrier_4/delete/${id_calendrier_4}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal(
            "Supprimé",
            "L'absence enseignante a été supprimée",
            "success"
          );
          fetchAbsence_enseignants();
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
  const fetchRecherche_absence_enseignant = async () => {
    try {
      const response = await fetch("/api/recherche/absence/enseignant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_value),
      });
      const data = await response.json();
      setAbsence_enseignants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_absence = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchAbsence_enseignants();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_absence_enseignant();
  };

  return (
    <AbsenceEnseignant_List
      absence_enseignants={absence_enseignants}
      handleDelete={handleDelete}
      handleRecherche_absence_enseignant={handleRecherche_absence}
      handleRecherche={handleRecherche}
    />
  );
}

export default AbsenceEnseignant;

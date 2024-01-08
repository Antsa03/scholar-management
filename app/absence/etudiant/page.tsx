"use client";
import Absence from "@/models/absence/etudiant/listage/Absence";
import AbsenceEtudiantFiltre from "@/models/filtrage/absence/AbsenceEtudiantFiltre";
import { showSwal } from "@/utils/swal";
import AbsenceList from "@/views/absence/etudiant/AbsenceList";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

function AbsenceForm() {
  const [absences, setAbsences] = useState<Array<Absence>>([]);
  const fetchAbsences = async () => {
    try {
      const response = await fetch("/api/absence/etudiant");
      const data = await response.json();
      setAbsences(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbsences();
  }, []);

  const handleDelete = async (id_calendrier_3: string) => {
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
          `/api/absence/etudiant/calendrier_3/delete/${id_calendrier_3}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          showSwal(
            "Supprimé",
            "L'absence étudiante a été supprimée.",
            "success"
          );
          fetchAbsences();
        } else {
          // Swal.fire("Annulé", "Echec de la suppression!", "error");

          showSwal("Annulé", "Echec de la suppression!", "success");
          console.error(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filtre_form = useForm<AbsenceEtudiantFiltre>({
    defaultValues: {
      groupe: "",
      annee_universitaire: "",
      type_absence: "",
    },
  });

  const [groupes, setGroupes] = useState<string[]>([]);
  const fetchGroupe = async () => {
    try {
      const response = await fetch("/api/fetch/information/groupe");
      const data = await response.json();
      setGroupes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [annee_universitaire, setAnne_universitaire] = useState<string[]>([]);
  const fetchAnnee_universitaire = async () => {
    try {
      const response = await fetch(
        "/api/fetch/information/annee-universitaire"
      );
      const data = await response.json();
      setAnne_universitaire(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter: SubmitHandler<AbsenceEtudiantFiltre> = async (filtre) => {
    try {
      const response = await fetch("/api/filtrage/absence/etudiant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filtre),
      });
      const data = await response.json();
      setAbsences(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAbsences();
    fetchGroupe();
    fetchAnnee_universitaire();
  }, []);

  const [search_value, setSearch_value] = useState("");
  const fetchRecherche_absence = async () => {
    try {
      const response = await fetch("/api/recherche/absence/etudiant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search_value),
      });
      const data = await response.json();
      setAbsences(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecherche_absence = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch_value(event.target.value);
    if (event.target.value === "") fetchAbsences();
  };

  const handleRecherche = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchRecherche_absence();
  };

  return (
    <AbsenceList
      absences={absences}
      handleDelete={handleDelete}
      groupes={groupes}
      annee_universitaire={annee_universitaire}
      register={filtre_form.register}
      handleSubmit={filtre_form.handleSubmit(handleFilter)}
      listAll={fetchAbsences}
      handleRecherche_absence={handleRecherche_absence}
      handleRecherche={handleRecherche}
    />
  );
}

export default AbsenceForm;

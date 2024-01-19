"use client";
import Demande_absence from "@/models/demande_absence/Demande_absence";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { calculateLevenshteinDistance } from "@/utils/levenshteinDistance";
import { showSwal } from "@/utils/swal";
import Demande_absence_Form from "@/views/demande_absence/Demande_absence_Form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function Demande_absence_ajout() {
  const router = useRouter();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Demande_absence>({
    defaultValues: {
      id_demande_absence: "",
      num_matricule: "",
      motif: "",
      date_demandee: "",
    },
  });

  const handleDemandeAbsence: SubmitHandler<Demande_absence> = async (
    demande_absence
  ) => {
    try {
      const response = await fetch("/api/demande_absence/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(demande_absence),
      });
      if (response.ok) {
        showSwal("Demande d'absence créée avec succès", "", "success");
        router.push("/demande_absence");
      } else {
        showSwal("Echec de la création de demande d'absence", "", "error");

        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Afficher la liste des étudiants
  const [etudiants, setEtudiants] = useState<Array<Etudiant>>([]);
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

  // L'état de l'affichage de l'étudiants
  const [showAllEtudiants, setShowAllEtudiants] = useState<boolean>(false);
  const handleShowAllEtudiants = () => {
    setSuggestions_etudiants([]);
    setShowAllEtudiants(!showAllEtudiants);
  };

  // Suggestions des étudiants
  const [suggestions_etudiants, setSuggestions_etudiants] = useState<
    Array<Etudiant>
  >([]);
  const onNum_matricule_change = () => {
    const num_matricule = watch("num_matricule").toString();
    if (num_matricule !== "") {
      const filteredEtudiant = etudiants.filter(
        (item) =>
          item &&
          item.num_matricule &&
          typeof item.num_matricule === "string" &&
          calculateLevenshteinDistance(item.num_matricule, num_matricule) <= 2
      );
      if (
        filteredEtudiant.some(
          (item) =>
            calculateLevenshteinDistance(item.num_matricule, num_matricule) ===
            0
        )
      ) {
        setSuggestions_etudiants([]);
      } else {
        setSuggestions_etudiants(filteredEtudiant);
      }
    } else setSuggestions_etudiants([]);
  };

  useEffect(() => {
    onNum_matricule_change();
  }, [watch("num_matricule")]);

  const handleClickSuggestion_etudiant = (value: string) => {
    setValue("num_matricule", value);
    setSuggestions_etudiants([]);
  };

  const handleClickAllEtudiant = (value: string) => {
    setValue("num_matricule", value);
    setShowAllEtudiants(false);
    setSuggestions_etudiants([]);
  };

  return (
    <Demande_absence_Form
      isUpdate={false}
      register={register}
      etudiants={etudiants}
      showAllEtudiants={showAllEtudiants}
      handleShowAllEtudiants={handleShowAllEtudiants}
      suggestions_etudiants={suggestions_etudiants}
      handleClickSuggestion_etudiant={handleClickSuggestion_etudiant}
      handleClickAllEtudiant={handleClickAllEtudiant}
      handleSubmit={handleSubmit(handleDemandeAbsence)}
      errors={errors}
    />
  );
}

export default Demande_absence_ajout;

"use client";
import Matiere from "@/models/enseignement/Matiere";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import Noter_1 from "@/models/note_1/Noter_1";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { calculateLevenshteinDistance } from "@/utils/levenshteinDistance";
import NoteForm from "@/views/note/NoteForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

function NoteAjout() {
  const router = useRouter();

  const [calendrier_2, setCalendrier_2] = useState<Array<Calendrier_2>>([]);
  const fetchCalendrier_2 = async () => {
    try {
      const response = await fetch("/api/note_1/calendrier_2");
      const data = await response.json();
      setCalendrier_2(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCalendrier_2();
  }, []);

  //Tout ce qui concerne noter_1
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Noter_1>({
    defaultValues: {
      id_noter_1: "",
      id_calendrier_2: "",
      num_matricule: "",
      code_matiere: "",
      note_matiere: "",
    },
  });

  const handleNoter_1: SubmitHandler<Noter_1> = async (noter_1) => {
    try {
      const response = await fetch("/api/note_1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noter_1),
      });
      if (response.ok) {
        //show dialogue alerte
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: true,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title:
            "Note créée avec succès.\n" +
            "ID Note_1 : " +
            noter_1.id_noter_1 +
            "\nCode matière : " +
            noter_1.code_matiere +
            "\n ID Calendrier_2 : " +
            noter_1.id_calendrier_2 +
            "\n N° matricule : " +
            noter_1.num_matricule +
            "\n Note /20 : " +
            noter_1.note_matiere,
        });

        router.push("/note");
      } else {
        Swal.fire(
          "Erreur",
          "Echec de la création de noter_1, veuillez vérifier les champs!",
          "error"
        );
        console.error(response);
      }
    } catch (error) {
      Swal.fire(
        "Erreur",
        "Echec de la création, veuillez vérifier les champs!",
        "error"
      );
      console.error(error);
    }
  };

  // Afficher toutes les matières
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

  //L'état de l'affichage du liste des matières
  const [showAllMatieres, setShowMatieres] = useState<boolean>(false);
  const handleClickShowAllMatiere = () => {
    setShowMatieres(!showAllMatieres);
  };

  // L'état de l'affichage de chaque matière
  const [suggestions_matieres, setSuggestions_matieres] = useState<any>();
  const onCode_matiere_change = () => {
    const code_matiere = watch("code_matiere");
    if (code_matiere.toString() !== "") {
      const filteredMatieres = matieres.filter(
        (item) =>
          item &&
          item.code_matiere &&
          typeof item.code_matiere === "string" &&
          calculateLevenshteinDistance(
            item.code_matiere.toUpperCase(),
            code_matiere.toString().toUpperCase()
          ) <= 5
      );

      // Si une correspondance exacte est trouvée, réinitialisez les suggestions
      if (
        filteredMatieres.some(
          (item) =>
            calculateLevenshteinDistance(
              item.code_matiere.toUpperCase(),
              code_matiere.toString().toUpperCase()
            ) === 0
        )
      ) {
        setSuggestions_matieres([]);
      } else {
        setSuggestions_matieres(filteredMatieres);
      }
    } else setSuggestions_matieres([]);
  };

  useEffect(() => {
    onCode_matiere_change();
  }, [watch("code_matiere")]);

  const handleClickSuggestion_matiere = (value: string) => {
    setValue("code_matiere", value);
    setSuggestions_matieres([]);
  };

  const handleClickAllMatiere = (value: string) => {
    setValue("code_matiere", value);
    setShowMatieres(false);
    setSuggestions_matieres([]);
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
    fetchMatieres();
    fetchEtudiants();
  }, []);

  // L'état de l'affichage de l'étudiants
  const [showAllEtudiants, setShowAllEtudiants] = useState<boolean>(false);
  const handleShowAllEtudiants = () => {
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
    <NoteForm
      isUpdate={false}
      calendrier_2={calendrier_2}
      register={register}
      matieres={matieres}
      handleClickAllMatiere={handleClickAllMatiere}
      handleClickSuggestion_matiere={handleClickSuggestion_matiere}
      handleClickShowAllMatieres={handleClickShowAllMatiere}
      showAllMatieres={showAllMatieres}
      suggestions_matieres={suggestions_matieres}
      etudiants={etudiants}
      showAllEtudiants={showAllEtudiants}
      handleShowAllEtudiants={handleShowAllEtudiants}
      suggestions_etudiants={suggestions_etudiants}
      handleClickSuggestion_etudiant={handleClickSuggestion_etudiant}
      handleClickAllEtudiant={handleClickAllEtudiant}
      handleSubmit={handleSubmit(handleNoter_1)}
      errors={errors}
    />
  );
}

export default NoteAjout;

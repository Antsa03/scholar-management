"use client";
import Matiere from "@/models/enseignement/Matiere";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import Noter_1 from "@/models/note_1/Noter_1";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { calculateLevenshteinDistance } from "@/utils/levenshteinDistance";
import { showSwal } from "@/utils/swal";
import NoteForm from "@/views/note/NoteForm";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function Noter_1_Edit() {
  const params = useParams();
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
    reset,
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

  const fetchNoter_1 = async () => {
    try {
      const response = await fetch(`/api/note_1/${params?.id_noter_1}`);
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNoter_1();
  }, [params?.id_noter_1, calendrier_2]);

  const handleUpdateNoter_1: SubmitHandler<Noter_1> = async (noter_1) => {
    try {
      const response = await fetch(`/api/note_1/update/${params?.id_noter_1}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noter_1),
      });
      if (response.ok) {
        showSwal("Noter_1 modifié avec succès", "", "success");
        // alert("Noter_1 modifié avec succès");
        router.push("/note");
      } else {
        // alert("Echec de la modification de noter_1");
        showSwal("Echec de la modification de noter_1", "", "error");
        console.error(response);
      }
    } catch (error) {
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

  useEffect(() => {
    fetchMatieres();
  }, []);

  //L'état de l'affichage du liste des matières
  const [showAllMatieres, setShowMatieres] = useState<boolean>(false);
  const handleClickShowAllMatiere = () => {
    setShowMatieres(!showAllMatieres);
    setSuggestions_matieres([]);
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
      isUpdate
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
      handleSubmit={handleSubmit(handleUpdateNoter_1)}
      errors={errors}
    />
  );
}

export default Noter_1_Edit;

"use client";
import Absence from "@/models/absence/etudiant/Absence";
import Calendrier_3 from "@/models/absence/etudiant/Calendrier_3";
import Matiere from "@/models/enseignement/Matiere";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { calculateLevenshteinDistance } from "@/utils/levenshteinDistance";
import { showSwal } from "@/utils/swal";
import AbsenceForm from "@/views/absence/etudiant/AbsenceForm";
import Calendrier_3_Form from "@/views/absence/etudiant/calendrier_3/Calendrier_3_Form";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Absence_Ajout() {
  const router = useRouter();
  //Tout ce qui concerne calendrier_3
  const calendrier_3_form = useForm<Calendrier_3>({
    defaultValues: {
      id_calendrier_3: "",
      date_deb_abs: "",
      heure_deb_abs: "",
    },
  });

  const { trigger } = calendrier_3_form;
  const trigger_calendrier_3_form = trigger;

  const handleCalendrier_3: SubmitHandler<Calendrier_3> = async (
    calendrier_3
  ) => {
    try {
      const response = await fetch(
        "/api/absence/etudiant/calendrier_3/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_3),
        }
      );
      if (response.ok) {
        console.log("Calendrier_3 crée avec succès");
      } else {
        Swal.fire(
          "Erreur",
          "Echec de la création de calendrier_3, veuillez vérifier les champs!",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Erreur",
        "Echec de la création de calendrier_3, veuillez vérifier les champs!",
        "error"
      );
    }
  };

  //Tout ce qui concerne l'absence
  const absence_form = useForm<Absence>({
    defaultValues: {
      id_absence: "",
      num_matricule: "",
      code_matiere: "",
      id_calendrier_3: "",
      type_absence: "",
      date_fin_abs: "",
      heure_fin_abs: "",
      justifiee: "",
    },
  });

  useEffect(() => {
    absence_form.setValue(
      "id_calendrier_3",
      calendrier_3_form.watch("id_calendrier_3").toString()
    );
  }, [calendrier_3_form.watch("id_calendrier_3")]);

  const handleAbsence: SubmitHandler<Absence> = async (absence) => {
    await calendrier_3_form.handleSubmit(handleCalendrier_3)();
    try {
      const response = await fetch("/api/absence/etudiant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(absence),
      });
      if (response.ok) {
        showSwal("Absence créée avec succès", "", "success");
        router.push("/absence/etudiant");
      } else {
        showSwal(
          "Erreur",
          "Echec de la l'ajout l'absence, veuillez vérifier les champs!",
          "error"
        );
        console.error(response);
      }
    } catch (error) {
      console.error(error);
      showSwal(
        "Erreur",
        "Echec de la l'ajout l'absence, veuillez vérifier les champs!",
        "error"
      );
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
  const handleClickShowAllMatieres = () => {
    setShowMatieres(!showAllMatieres);
  };

  // L'état de l'affichage de chaque matière
  const [suggestions_matieres, setSuggestions_matieres] = useState<any>();

  const onCode_matiere_change = () => {
    const code_matiere = absence_form.watch("code_matiere");
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
  }, [absence_form.watch("code_matiere")]);

  const handleClickSuggestion = (value: string) => {
    absence_form.setValue("code_matiere", value);
  };

  const handleClickAllMatiere = (value: string) => {
    absence_form.setValue("code_matiere", value);
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
    const num_matricule = absence_form.watch("num_matricule").toString();
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
  }, [absence_form.watch("num_matricule")]);

  const handleClickSuggestion_etudiant = (value: string) => {
    absence_form.setValue("num_matricule", value);
  };

  const handleClickAllEtudiant = (value: string) => {
    absence_form.setValue("num_matricule", value);
    setShowAllEtudiants(false);
    setSuggestions_etudiants([]);
  };

  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire d'absence pour étudiant
      </h1>
      <h2 className="h2">Ajouter un absence pour étudiant</h2>
      <Calendrier_3_Form
        isUpdate={false}
        register={calendrier_3_form.register}
        errors={calendrier_3_form.formState.errors}
      />
      <AbsenceForm
        isUpdate={false}
        register={absence_form.register}
        matieres={matieres}
        suggestions_matieres={suggestions_matieres}
        showAllMatieres={showAllMatieres}
        handleClickShowAllMatieres={handleClickShowAllMatieres}
        handleClickSuggestion={handleClickSuggestion}
        handleClickAllMatiere={handleClickAllMatiere}
        etudiants={etudiants}
        showAllEtudiants={showAllEtudiants}
        handleShowAllEtudiants={handleShowAllEtudiants}
        suggestions_etudiants={suggestions_etudiants}
        handleClickSuggestion_etudiant={handleClickSuggestion_etudiant}
        handleClickAllEtudiant={handleClickAllEtudiant}
        handleSubmit={absence_form.handleSubmit(handleAbsence)}
        errors={absence_form.formState.errors}
        trigger_calendrier_3_form={trigger_calendrier_3_form}
      />
    </div>
  );
}

export default Absence_Ajout;

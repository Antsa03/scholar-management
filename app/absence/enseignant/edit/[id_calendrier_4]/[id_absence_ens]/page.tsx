"use client";
import Calendrier_4_Form from "@/views/absence/enseignant/calendrier_4/Calendrier_4_Form";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AbsenceEnseignant_Form from "@/views/absence/enseignant/AbsenceEnseignant_Form";
import { calculateLevenshteinDistance } from "@/utils/levenshteinDistance";
import Matiere from "@/models/enseignement/Matiere";
import { SubmitHandler, useForm } from "react-hook-form";
import Calendrier_4 from "@/models/absence/enseignant/Calendrier_4";
import Absence_enseignant from "@/models/absence/enseignant/Absence_enseignant";
import { showSwal } from "@/utils/swal";

function AbsenceEnseignant_Edit() {
  const router = useRouter();
  const params = useParams();
  // Tout ce qui concerne calendrier_4
  const calendrier_4_form = useForm<Calendrier_4>({
    defaultValues: {
      id_calendrier_4: "",
      date_deb_abs_ens: "",
      heure_deb_abs_ens: "",
    },
  });

  const { trigger } = calendrier_4_form;
  const trigger_calendrier_4_form = trigger;

  const fetchCalendrier_4 = async () => {
    try {
      const response = await fetch(
        `/api/absence/enseignant/calendrier_4/${params?.id_calendrier_4}`
      );
      const data = await response.json();
      calendrier_4_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCalendrier_4();
  }, [params?.id_calendrier_4]);

  const handleUpdateCalendrier_4: SubmitHandler<Calendrier_4> = async (
    calendrier_4
  ) => {
    try {
      const response = await fetch(
        `/api/absence/enseignant/calendrier_4/update/${params?.id_calendrier_4}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_4),
        }
      );
      if (response.ok) console.log("Calendrier_4 modifié avec succès");
      else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne l'absence enseignant
  const absence_enseignant_form = useForm<Absence_enseignant>({
    defaultValues: {
      id_absence_ens: "",
      code_matiere: "",
      id_calendrier_4: "",
      date_fin_abs_ens: "",
      heure_fin_abs_ens: "",
      justifiee_ens: "",
    },
  });

  const fetchAbsenceEnseignant = async () => {
    try {
      const response = await fetch(
        `/api/absence/enseignant/${params?.id_absence_ens}`
      );
      const data = await response.json();
      absence_enseignant_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbsenceEnseignant();
  }, [params?.id_absence_ens]);

  const handleUpdateAbsenceEnseignant: SubmitHandler<
    Absence_enseignant
  > = async (absence_enseignant) => {
    await calendrier_4_form.handleSubmit(handleUpdateCalendrier_4)();
    absence_enseignant_form.setValue(
      "id_calendrier_4",
      calendrier_4_form.watch("id_calendrier_4")
    );
    try {
      const response = await fetch(
        `/api/absence/enseignant/update/${params?.id_absence_ens}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(absence_enseignant),
        }
      );
      if (response.ok) {
        // alert("Absence enseignant modifiée avec succès");
        showSwal("Absence enseignant modifiée avec succès", "", "success");
        router.push("/absence/enseignant");
      } else {
        // alert("Echec de la modification de l'absence enseignant");
        showSwal(
          "Echec de la modification de l'absence enseignant",
          "",
          "success"
        );
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
  };

  // L'état de l'affichage de chaque matière
  const [suggestions, setSuggestions] = useState<any>();
  const onCode_matiere_change = () => {
    const code_matiere = absence_enseignant_form.watch("code_matiere");
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
        setSuggestions([]);
      } else {
        setSuggestions(filteredMatieres);
      }
    } else setSuggestions([]);
  };

  useEffect(() => {
    onCode_matiere_change();
  }, [absence_enseignant_form.watch("code_matiere")]);

  const handleClickSuggestion = (value: string) => {
    absence_enseignant_form.setValue("code_matiere", value);
  };

  const handleClickAllMatiere = (value: string) => {
    absence_enseignant_form.setValue("code_matiere", value);
    setShowMatieres(false);
    setSuggestions([]);
  };

  return (
    <>
      <Calendrier_4_Form
        isUpdate={true}
        register={calendrier_4_form.register}
        errors={calendrier_4_form.formState.errors}
      />
      <AbsenceEnseignant_Form
        isUpdate={true}
        register={absence_enseignant_form.register}
        matieres={matieres}
        suggestions={suggestions}
        showAllMatieres={showAllMatieres}
        handleClickAllMatiere={handleClickAllMatiere}
        handleClickShowAllMatieres={handleClickShowAllMatiere}
        handleClickSuggestion={handleClickSuggestion}
        handleSubmit={absence_enseignant_form.handleSubmit(
          handleUpdateAbsenceEnseignant
        )}
        errors={absence_enseignant_form.formState.errors}
        trigger_calendrier_4_form={trigger_calendrier_4_form}
      />
    </>
  );
}

export default AbsenceEnseignant_Edit;

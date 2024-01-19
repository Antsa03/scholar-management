"use client";
import Option from "@/models/filtrage/Option";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import { IonIcon } from "@ionic/react";
import { add, save } from "ionicons/icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showSwal } from "@/utils/swal";

function NoteListBDExcel() {
  const [isGenerateExcel, setIsGenerateExcel] = useState(false);
  const option_form = useForm<Option>({
    defaultValues: {
      id_calendrier_2: "",
      groupe: "",
    },
  });

  const [liste_note, setListeNote] = useState<any[]>([]);
  const handleShowNote: SubmitHandler<Option> = async (option) => {
    try {
      const response = await fetch(
        `/api/xlsx/${option.id_calendrier_2}/${option.groupe}`
      );
      const data = await response.json();
      setListeNote(data);
    } catch (error) {
      console.error(error);
    }
  };
  const [groupes, setGroupes] = useState<string[]>([]);
  const fetchGroupes = async () => {
    try {
      const response = await fetch("/api/fetch/information/groupe");
      const data = await response.json();
      setGroupes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [calendrier_2, setCalendrier_2] = useState<Calendrier_2[]>([]);
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
    fetchGroupes();
    fetchCalendrier_2();
  }, []);

  const generateExcel = async () => {
    const groupe = option_form.watch("groupe");
    const id_calendrier_2 = option_form.watch("id_calendrier_2");
    let annee_universitaire = "";
    let semestre = "";
    calendrier_2.forEach((cal) => {
      if (id_calendrier_2 === cal.id_calendrier_2) {
        annee_universitaire = cal.annee_universitaire_2;
        semestre = cal.semestre;
      }
    });
    try {
      if (!liste_note) return;
      const response = await fetch(
        `/api/xlsx/generate/${id_calendrier_2}/${groupe}`,
        {
          method: "POST",
        }
      );
      const excelBlob = await response.blob();
      // alert("Excel générer avec succès");
      showSwal("Excel générer avec succès", "", "success");
      saveAs(
        excelBlob,
        `liste de note S${semestre} ${groupe} ${annee_universitaire}.xlsx`
      );
    } catch (error) {
      console.error(error);
      showSwal("Erreur lors de la génération du fichier", "", "error");
    }
  };

  return (
    <div className="main-container ml-32 ">
      <div className="flex flex-col w-fit items-start gap-8">
        <h1 className="h1 flex flex-row justify-center gap-2">
          <IonIcon
            icon={add}
            className="-text--text-blue-color  ion-icon-title"
          ></IonIcon>
          Exporter les notes de la base de données dans un fichier excel
        </h1>
        <div className="flex flex-col w-full justify-center items-center  custom-xl:flex-row ">
          <form
            onSubmit={option_form.handleSubmit(handleShowNote)}
            className="flex flex-row items-center gap-6"
          >
            <select
              {...option_form.register("id_calendrier_2")}
              className="select-form"
            >
              <option value="">Sélectionnez le calendrier_2</option>
              {calendrier_2.map((calendrier, index) => (
                <option key={index} value={calendrier.id_calendrier_2}>
                  {calendrier.id_calendrier_2 +
                    ": " +
                    calendrier.annee_universitaire_2 +
                    " S" +
                    calendrier.semestre +
                    " Session " +
                    calendrier.session}
                </option>
              ))}
            </select>
            <select {...option_form.register("groupe")} className="select-form">
              <option value="">Sélectionner le groupe</option>
              {groupes.map((groupe, index) => (
                <option key={index} value={groupe}>
                  {groupe}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-list-all">
              Lister
            </button>
          </form>
        </div>
        <button
          onClick={async () => {
            setIsGenerateExcel(true);
            await generateExcel();
            setIsGenerateExcel(false);
          }}
          className="flex flex-row self-center w-[340px] gap-2 items-center justify-center  text-white tracking-wider py-2 rounded-md  transition-all delay-75 ease-in-out bg-teal-700 hover:bg-teal-700/90 hover:scale-105 "
        >
          {isGenerateExcel ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              Génération du fichier en cours...
            </>
          ) : (
            <>
              <IonIcon icon={save} className="text-white block" />
              Générer le fichier excel
            </>
          )}
        </button>
        <div className="w-full flex flex-col gap-2 -border--border-secondary-color border-[1px] shadow-md p-4 mt-6 rounded-md">
          <h2 className="h2 text-center underline uppercase font-poppins ">
            Liste des notes
          </h2>

          <pre className="mb-5 text-sm">
            {JSON.stringify(liste_note, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default NoteListBDExcel;

"use client";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import Noter_1 from "@/models/note_1/Noter_1";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { showSwal } from "@/utils/swal";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { add, closeOutline, save, trash } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type ExcelData = {
  nom: string;
  code_matiere: string;
  note_matiere: string;
};

interface Note {
  nom: string;
  prenoms: string;
  code_matiere: string;
  note_matiere: string;
}

function NoteFromExcel() {
  //Variable pour stocker les données à partir du fichier excel
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [id_calendrier_2, setCalendrier_2] = useState("");
  const [isBtnSaveDisable, setIsBtnSaveDisable] = useState(true);
  const [isBtnDeleteDisable, setIsBtnDeleteDisable] = useState(true);
  const [isEnregistrer, setIsEnregistrer] = useState(false);
  const [isEffacer, setIsEffacer] = useState(false);

  const handleBtnValiderClick = () => {
    if (isBtnSaveDisable === false && isBtnDeleteDisable === false) {
      setIsBtnDeleteDisable(true);
      setIsBtnSaveDisable(true);
    }
    if (excelData.length > 0 && id_calendrier_2 !== "") {
      setIsBtnSaveDisable(false);
      setIsBtnDeleteDisable(false);
    } else {
      showSwal(
        "Erreur",
        "Veuillez séléctionner un fichier et de choisir un ID calendrier_2",
        "error"
      );
    }
  };

  function filterEmptyRows(jsonData: any[]): any[] {
    return jsonData.filter(
      (row: any[]) =>
        !row.every(
          (cell: any) => cell === "" || cell === null || cell === undefined
        )
    );
  }

  function findStartRow(jsonData: any[]): number {
    for (let i = 0; i < jsonData.length; i++) {
      if (
        jsonData[i][0] === "Noms et prénoms" ||
        jsonData[i][0].toLowerCase().includes("nom et prénoms") ||
        jsonData[i][0].toLowerCase().includes("prenom")
      ) {
        return i + 1;
      }
    }
    return 0;
  }

  function findCodeMatIndexRow(jsonData: any[]): number {
    for (let i = 0; i < jsonData.length; i++) {
      if (
        jsonData[i][0] === "Code matière" ||
        jsonData[i][0].toLowerCase().includes("code matière") ||
        jsonData[i][0].toLowerCase().includes("code mat")
      ) {
        return i;
      }
    }
    return 0;
  }

  function shouldSkipColumn(title: any): boolean {
    return (
      title === undefined ||
      title === "" ||
      title.startsWith("P_") ||
      title.includes("Moy") ||
      title.includes("Modules à rattraper") ||
      title.includes("Module")
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const excelFile = new Uint8Array(event.target!.result as ArrayBuffer);
      const workbook = XLSX.read(excelFile, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      let jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 1,
      }) as any;

      // Filter out empty rows == Remove empty rows from jsonData
      jsonData = filterEmptyRows(jsonData);

      // Find the start row for the data
      const startRow = findStartRow(jsonData);

      // Find the index row of the "Code matière"
      let indexCodeMat: number = findCodeMatIndexRow(jsonData);

      // Get the ROW VALUE of the "Code matière"
      let infoTitles = jsonData[indexCodeMat];
      let data: ExcelData[] = [];

      for (let i = startRow; i < jsonData.length; i++) {
        let rowData = jsonData[i];
        let row = rowData;

        for (let j = 1; j < row.length; j++) {
          let title = infoTitles[j];
          let note = rowData[j];

          if (shouldSkipColumn(title)) {
            continue;
          }

          let obj: ExcelData = {
            nom: row[0],
            code_matiere: title,
            note_matiere: note,
          };
          data.push(obj);
        }
      }

      setExcelData(data);
    };
    reader.readAsArrayBuffer(file);
  };

  //Récupération étudiant
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const fetchEtudiants = async () => {
    try {
      const response = await fetch("/api/utilisateur/etudiant");
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [calendrier_2, setCalendrier] = useState<Calendrier_2[]>([]);
  const fetchCalendrier_2 = async () => {
    try {
      const response = await fetch("/api/note_1/calendrier_2");
      const data = await response.json();
      setCalendrier(data);
    } catch (error) {
      console.error(error);
    }
  };

  //Arrangement pour séparer le nom et les prénoms
  const [notes, setNotes] = useState<Noter_1[]>([]);
  const notesToUpdate: Noter_1[] = [];
  const notesToCreate: Noter_1[] = [];
  const arrangerNote = () => {
    if (id_calendrier_2 === "") setNotes([]);
    else {
      const new_notes: Note[] = [];
      let mots: string[] = [];
      let nom = "";
      let prenoms = "";
      excelData.forEach(async (excel) => {
        mots = [];
        mots = excel.nom.split(" ");
        nom = "";
        prenoms = "";
        if (mots.length > 1) {
          for (let mot of mots) {
            if (mot === mot.toUpperCase()) {
              nom += mot + " ";
            } else if (mot[0] === mot[0].toUpperCase()) {
              prenoms += mot + " ";
            }
          }

          nom = nom.trim();
          prenoms = prenoms.trim();
        }
        console.log(nom + " " + prenoms);
        if (nom !== "") {
          const note: Note = {
            nom: nom,
            prenoms: prenoms,
            code_matiere: excel.code_matiere,
            note_matiere: excel.note_matiere,
          };

          new_notes.push(note);
        }
      });
      const new_notes_1: Noter_1[] = [];
      new_notes.map((note) => {
        etudiants.forEach((etudiant) => {
          if (note.nom === etudiant.nom && note.prenoms === etudiant.prenoms) {
            const note_1: Noter_1 = {
              id_noter_1: etudiant.num_matricule + "-" + note.code_matiere,
              id_calendrier_2: id_calendrier_2,
              num_matricule: etudiant.num_matricule,
              code_matiere: note.code_matiere,
              note_matiere: note.note_matiere + "",
            };
            new_notes_1.push(note_1);
          }
        });
      });
      setNotes(new_notes_1);
      setNotesCreated(0);
      setNotesUpdated(0);
      setErrorNotes([]);
    }
  };

  const [notes_1, setNotes_1] = useState<Noter_1[]>([]);
  const fetchNoter_1 = async () => {
    try {
      const response = await fetch("/api/note_1");
      const data = await response.json();
      setNotes_1(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEtudiants();
    fetchCalendrier_2();
    fetchNoter_1();
  }, []);

  const [notesCreated, setNotesCreated] = useState(0);
  const [notesUpdated, setNotesUpdated] = useState(0);
  const [errorNotes, setErrorNotes] = useState<Noter_1[]>([]);

  useEffect(() => {
    notes.forEach((note) => {
      const noteInNotes1 = notes_1.find(
        (note1) => note1.id_noter_1 === note.id_noter_1
      );
      if (
        noteInNotes1 &&
        parseFloat(note.note_matiere) > parseFloat(noteInNotes1.note_matiere)
      ) {
        notesToUpdate.push(note);
      }
    });
    notes.forEach((note) => {
      const noteInNotes1 = notes_1.find(
        (note1) => note1.id_noter_1 === note.id_noter_1
      );
      if (!noteInNotes1) {
        notesToCreate.push(note);
      }
    });
  }, [notes_1, notes]);

  const saveNoteToDB = async () => {
    try {
      setNotesCreated(0);
      setNotesUpdated(0);

      const updatePromises = notesToUpdate.map(async (note) => {
        const response = await fetch(`/api/note_1/update/${note.id_noter_1}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        });
        if (response.ok) {
          console.log("Note updated successfully");
          setNotesUpdated((prev) => prev + 1);
        } else {
          console.error(response);
          setErrorNotes((prev) => [...prev, note]);
        }
      });

      const createPromises = notesToCreate.map(async (note) => {
        const response = await fetch("/api/note_1/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        });
        if (response.ok) {
          console.log("Note created successfully");
          setNotesCreated((prev) => prev + 1);
        } else {
          console.error(response);
          setErrorNotes((prev) => [...prev, note]);
        }
      });

      await Promise.all([...updatePromises, ...createPromises]);

      if (notesToCreate.length === 0 && notesToUpdate.length === 0) {
        showSwal("", "Aucune modification de note trouvée !", "info");
      }

      // #########################
      handleBtnValiderClick();
    } catch (error) {
      console.error(error);
    }
  };

  const [notesDeleted, setNotesDeleted] = useState(0);
  const [deleteAttempted, setDeleteAttempted] = useState(false);

  useEffect(() => {
    if (deleteAttempted && notesDeleted === 0) {
      showSwal(
        "",
        "Note inexistant dans la base de donnée , aucun note a été a supprimé",
        "info"
      );
    }
  }, [deleteAttempted, notesDeleted]);

  const deleteNote = async () => {
    try {
      if (notes.length > 0) {
        let notesDeletedTemp = 0;
        const deletePromises = notes.map(async (note) => {
          const response = await fetch(
            `/api/note_1/delete/${note.id_noter_1}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            console.log("Note deleted successfully");
            notesDeletedTemp += 1;
            setNotesDeleted((prev) => prev + 1);
          } else {
            console.error(response);
          }
        });

        await Promise.all(deletePromises);
        setNotesDeleted(notesDeletedTemp);
        setDeleteAttempted(true);
      } else {
        alert("Notes non définis");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-container ml-32">
      <div className="flex flex-col w-fit items-start gap-8">
        <h1 className="h1 flex flex-row justify-center gap-2">
          <IonIcon
            icon={add}
            className="-text--text-blue-color  ion-icon-title"
          ></IonIcon>
          Enregistrement de note vers la base de données depuis un fichier excel
        </h1>
        <div className="flex flex-col w-full justify-center items-center  custom-xl:flex-row">
          <div className="w-fit flex flex-col gap-4">
            <div className="container-row-div-input">
              <div className="container-input">
                <label htmlFor="file" className="label">
                  Veuillez choisir le fichier excel
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  name="file"
                />
              </div>
              <div className="container-select">
                <label htmlFor="" className="label">
                  Veuillez choisir le semestre
                </label>
                <select
                  name=""
                  onChange={(e) => setCalendrier_2(e.target.value)}
                  className="select-form"
                >
                  <option value="">Sélectionner l'ID calendrier_2</option>
                  {calendrier_2.map((cal) => (
                    <option
                      value={cal.id_calendrier_2}
                      key={cal.id_calendrier_2}
                    >
                      {cal.id_calendrier_2 +
                        ": Année-universitaire: " +
                        cal.annee_universitaire_2 +
                        " / S" +
                        cal.semestre +
                        " - Session " +
                        cal.session}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <button
                onClick={() => {
                  arrangerNote();
                  handleBtnValiderClick();
                }}
                className="flex-1 button-add-info"
              >
                Valider
              </button>
              <button
                disabled={isBtnSaveDisable}
                onClick={async () => {
                  setIsEnregistrer(true);
                  await saveNoteToDB();
                  setIsEnregistrer(false);
                }}
                className={`flex flex-row gap-2 items-center justify-center flex-1  text-white tracking-wider py-2 w-full rounded-md  transition-all delay-75 ease-in-out ${
                  isBtnSaveDisable
                    ? "bg-teal-200 blur-sm"
                    : "bg-teal-700 hover:bg-teal-700/90 hover:scale-105"
                }`}
              >
                {isEnregistrer ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                    Enregistrement en cours...
                  </>
                ) : (
                  <>
                    <IonIcon icon={save} className="text-white block" />
                    Enregistrer
                  </>
                )}
              </button>
              <button
                disabled={isBtnDeleteDisable}
                onClick={async () => {
                  setIsEffacer(true);
                  await deleteNote();
                  setIsEffacer(false);
                }}
                className={`flex flex-row gap-2 items-center justify-center flex-1  text-white tracking-wider py-2 w-full rounded-md transition-all delay-75 ease-in-out ${
                  isBtnDeleteDisable
                    ? "bg-red-200 blur-sm"
                    : "bg-red-600 hover:bg-red-600/90 hover:scale-105"
                }`}
              >
                {isEffacer ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                    Suppression en cours...
                  </>
                ) : (
                  <>
                    <IonIcon icon={trash} className="text-white block" />
                    Effacer la note
                  </>
                )}
              </button>
            </div>

            <div className="w-full flex flex-col gap-2 -border--border-secondary-color border-[1px] shadow-md p-4 mt-6 rounded-md">
              <h2 className="h2 text-center underline uppercase font-poppins">
                Recapitulation
              </h2>
              <div className="w-full  py-2 mx-auto flex flex-row gap-4">
                <div className="flex-1 pl-8">
                  <h2 className="-text--text-blue-color text-xl">
                    {" "}
                    Enregistrement :
                  </h2>
                  <ul className="list-inside list-disc flex flex-col gap-3">
                    <li className="block ">
                      Nombre de note ajouter :
                      <span className="ml-2 text-xl font-bold py-1 px-2 -text--text-secondary-color -bg--bg-ui-color-press rounded-md">
                        {notesCreated}
                      </span>{" "}
                    </li>
                    <li className="block ">
                      Nombre de note mis à jour :
                      <span className="ml-2 text-xl font-bold py-1 px-2 -text--text-secondary-color -bg--bg-ui-color-press rounded-md">
                        {notesUpdated}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <h2 className="-text--text-blue-color text-xl">
                    Suppression :
                  </h2>
                  <ul className="list-inside list-disc">
                    <li className="block ">
                      Nombre de note supprimer :
                      <span className="ml-2 text-xl font-bold py-1 px-2 -text--text-secondary-color -bg--bg-ui-color-press rounded-md">
                        {notesDeleted}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {errorNotes.length === 0 ? (
                <></>
              ) : (
                <div className="mx-auto">
                  <p>Liste des notes qui ont généré une erreur</p>
                  {errorNotes.map((note) => (
                    <ul
                      key={note.id_noter_1}
                      className="w-full pt-8 pl-12 pr-8 pb-4 m-2 shadow-custom relative rounded-md"
                    >
                      <IonIcon
                        icon={closeOutline}
                        className="text-red-700  ion-icon-middle left-2 top-2 absolute"
                      ></IonIcon>
                      <li className="text-sm">ID noter_1: {note.id_noter_1}</li>
                      <li className="text-sm">
                        ID calendrier_2: {note.id_calendrier_2}
                      </li>
                      <li className="text-sm">
                        N° matricule: {note.num_matricule}
                      </li>
                      <li className="text-sm">
                        Code matière: {note.code_matiere}
                      </li>
                      <li className="text-sm">Note: {note.note_matiere}</li>
                    </ul>
                  ))}
                </div>
              )}

              <div className="overflow-y-scroll h-fit">
                {notes.length > 0 && (
                  <table className=" mx-auto ">
                    <thead>
                      <tr>
                        <th># noter_1</th>
                        <th># calendrier_2</th>
                        <th>N° matricule</th>
                        <th>Code matiere</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notes.map((note_create) => (
                        <tr key={note_create.id_noter_1}>
                          <td>{note_create.id_noter_1}</td>
                          <td>{note_create.id_calendrier_2}</td>
                          <td>{note_create.num_matricule}</td>
                          <td>{note_create.code_matiere}</td>
                          <td>{note_create.note_matiere}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteFromExcel;

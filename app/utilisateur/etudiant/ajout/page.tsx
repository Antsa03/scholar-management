"use client";
import React, { useState } from "react";
import Information from "@/models/information/Information";
import Observation from "@/models/information/Observation";
import * as XLSX from "xlsx";
import ExcelDateToJSDate from "@/utils/ExcelDateToJSDate";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Etudiant from "@/models/utilisateur/Etudiant";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import Swal from "sweetalert2";
import { showSwal } from "@/utils/swal";

function Etudiant_ajout_info() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [informations, setInformations] = useState<Information[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 1,
      }) as any[][];

      const newUtilisateurs: Utilisateur[] = [];
      const newEtudiants: Etudiant[] = [];

      const newInformation: Information[] = [];
      const newObservation: Observation[] = [];

      jsonData.forEach((row: any[]) => {
        const utilisateur: Utilisateur = {
          id_utilisateur: row[0],
          photo_profil: "user.png",
          nom: row[1],
          prenoms: row[2] || "",
          sexe: row[3] === "M" ? "Masculin" : "Féminin",
          adresse: row[4],
          telephone: row[5],
          email: row[6],
          mot_de_passe: row[7],
        };

        const etudiant: Etudiant = {
          num_matricule: row[8],
          date_naissance: ExcelDateToJSDate(row[9]).toISOString().slice(0, 10),
          lieu_naissance: row[10],
          nationalite: row[11],
          civilite: row[12],
          id_utilisateur: row[0],
        };

        newUtilisateurs.push(utilisateur);
        newEtudiants.push(etudiant);

        const observation: Observation = {
          id_obs: row[17],
          admis: row[18],
          situation: row[19],
          date_insc: ExcelDateToJSDate(row[20]).toISOString().slice(0, 10),
          date_arret: row[21]
            ? ExcelDateToJSDate(row[20]).toISOString().slice(0, 10)
            : "",
        };

        const information = {
          id_information: row[13],
          num_matricule: row[8],
          annee_universitaire_5: row[14],
          id_obs: row[17],
          id_niveau: row[15],
          groupe: row[16] + "",
        };

        newObservation.push(observation);
        newInformation.push(information);
      });
      setUtilisateurs(newUtilisateurs);
      setEtudiants(newEtudiants);
      setObservations(newObservation);
      setInformations(newInformation);
    };

    reader.readAsArrayBuffer(file);
  };

  const createUserEtudiant = async () => {
    let counter = 0;
    if (utilisateurs.length > 0) {
      utilisateurs.forEach(async (utilisateur) => {
        const response = await fetch("/api/utilisateur/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(utilisateur),
        });
        if (response.ok) {
          counter += 1;
          console.log("Utilisateur créé avec succès");
        } else console.error(response);
        if (counter === utilisateurs.length) {
          showSwal(
            "Les informations en tant qu'utilisateur sont créées",
            "",
            "success"
          );
        }
      });
    } else {
      showSwal(
        "Pour information",
        "Données en tant qu'utilisateur non définies",
        "error"
      );
    }
  };

  const createEtudiant = async () => {
    let counter = 0;
    if (etudiants.length > 0) {
      etudiants.forEach(async (etudiant) => {
        const response = await fetch("/api/utilisateur/etudiant/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(etudiant),
        });
        if (response.ok) {
          counter += 1;
          console.log("Etudiant crée avec succès");
        } else console.error(response);
        if (counter === utilisateurs.length) {
          showSwal(
            "Les informations en tant qu'étudiant sont créées",
            "",
            "success"
          );
        }
      });
    } else {
      showSwal(
        "Pour information",
        "Données en tant qu'étudiant non définies",
        "error"
      );
    }
  };

  const saveData = async () => {
    if (informations.length > 0 && observations.length > 0) {
      try {
        const response = await fetch("/api/create-observation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(observations),
        });
        if (response.ok) {
          const response = await fetch("/api/create-info", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(informations),
          });
          if (response.ok) {
            showSwal(
              "Toutes les observations et informations sont créées",
              "",
              "success"
            );
          }
        } else {
          showSwal("Echec de la création", "", "error");
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    } else
      showSwal(
        "Pour information",
        "Données pour l'information supplémentaire non définies",
        "error"
      );
  };

  return (
    <div className="main-container">
      <div className="flex flex-col w-full items-start gap-8">
        <h1 className="h1 flex flex-row justify-center gap-2">
          <IonIcon
            icon={add}
            className="-text--text-blue-color  ion-icon-title"
          ></IonIcon>
          Ajout d'étudiant via excel
        </h1>
        <div className="flex flex-col w-full justify-center items-center custom-xl:flex-row">
          <div className="w-full flex flex-col gap-4">
            <div className="container-row-div-input">
              <div className="container-input">
                <label htmlFor="file">Choisissez un fichier</label>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-[50%] mx-auto">
              <button
                onClick={createUserEtudiant}
                className="button-add-info flex-1 py-2 mx-auto"
              >
                Créer les informations en tant qu'utilisateur
              </button>
              <button
                onClick={createEtudiant}
                className="flex flex-row gap-2 items-center justify-center flex-1  text-white tracking-wider px-2 py-2 w-full rounded-md  transition-all delay-75 ease-in-out bg-teal-700 hover:bg-teal-700/90 hover:scale-105"
              >
                Créer les informations en tant qu'étudiant
              </button>
              <button
                onClick={() => saveData()}
                className="flex flex-row gap-2 items-center justify-center flex-1  text-white tracking-wider px-2 py-2 w-full rounded-md  transition-all delay-75 ease-in-out bg-teal-400 hover:bg-teal-400/90 hover:scale-105"
              >
                Créer les informations supplémentaires (observations et
                informations)
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-[95%] h-[600px] gap-4 overflow-x-scroll overflow-y-scroll">
          <div className="border-[2px] h-fit rounded-md  p-2">
            <h2 className="h2">Information en tant qu'utilisateur :</h2>
            <pre>{JSON.stringify(utilisateurs, null, 2)}</pre>
          </div>
          <div className="border-[2px] h-fit rounded-md p-2">
            <h2 className="h2">Information en tant qu'étudiant :</h2>
            <pre>{JSON.stringify(etudiants, null, 2)}</pre>
          </div>
          <div className="border-[2px] h-fit rounded-md p-2">
            <h2 className="h2">Observations :</h2>
            <pre>{JSON.stringify(informations, null, 2)}</pre>
          </div>
          <div className="border-[2px] h-fit rounded-md p-2">
            <h2 className="h2">Informations :</h2>
            <pre>{JSON.stringify(observations, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Etudiant_ajout_info;

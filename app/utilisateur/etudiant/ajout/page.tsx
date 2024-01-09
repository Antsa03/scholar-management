"use client";
import React, { useState } from "react";
import Information from "@/models/information/Information";
import Observation from "@/models/information/Observation";
import * as XLSX from "xlsx";
import ExcelDateToJSDate from "@/utils/ExcelDateToJSDate";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Etudiant from "@/models/utilisateur/Etudiant";

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
    if (utilisateurs.length > 0 && etudiants.length > 0) {
      utilisateurs.forEach(async (utilisateur) => {
        const response = await fetch("/api/utilisateur/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(utilisateur),
        });
        if (response.ok) console.log("Utilisateur créé avec succès");
        else console.error(response);
      });
    } else {
      alert("Utilisateurs et étudiants non définis");
    }
  };

  const createEtudiant = async () => {
    etudiants.forEach(async (etudiant) => {
      const response = await fetch("/api/utilisateur/etudiant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(etudiant),
      });
      if (response.ok) console.log("Etudiant crée avec succès");
      else console.error(response);
    });
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
            alert("Toutes les observations et informations sont créées");
          }
        } else console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else alert("Informations et observations non définis");
  };

  const saveInfo = async () => {
    if (informations.length > 0) {
      const response = await fetch("/api/create-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(informations),
      });
      if (response.ok) {
        alert("Toutes les observations et informations sont créées");
      } else console.log(response);
    }
  };

  const deleteObs = async () => {
    if (informations.length > 0 && observations.length > 0) {
      informations.forEach(async (info) => {
        try {
          const response = await fetch(
            `/api/information/observation/delete/${info.id_obs}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) console.log("Observation supprimés avec succès");
        } catch (error) {
          console.log(error);
        }
      });
    } else alert("Informations et observations non définies");
  };

  return (
    <div>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />{" "}
      <br />
      <button onClick={createUserEtudiant}>
        Créer les utilisateurs de type étudiant
      </button>{" "}
      <br />
      <button onClick={createEtudiant}>Créer les étudiants</button> <br />
      <button onClick={() => saveData()}>
        Enregister dans les informations supplémentaires
      </button>{" "}
      <br />
      <button onClick={() => deleteObs()}>Delete information</button> <br />
      <p>{observations.length}</p>
      <div className="flex">
        <pre>{JSON.stringify(utilisateurs, null, 2)}</pre>
        <pre>{JSON.stringify(etudiants, null, 2)}</pre>
        <pre>{JSON.stringify(informations, null, 2)}</pre>
        <pre>{JSON.stringify(observations, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Etudiant_ajout_info;

"use client";
import Information from "@/models/information/Information";
import Observation from "@/models/information/Observation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ExcelDateToJSDate from "@/utils/ExcelDateToJSDate";
import informationJson from "@/public/json/information.json";

function EtudiantInfo() {
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

      const newInformation: Information[] = [];
      const newObservation: Observation[] = [];

      jsonData.forEach((row: any[]) => {
        const observation = {
          id_obs: row[5],
          admis: row[6],
          situation: row[7],
          date_insc: ExcelDateToJSDate(row[8]).toISOString().slice(0, 10),
          date_arret: row[9]
            ? ExcelDateToJSDate(row[9]).toISOString().slice(0, 10)
            : "",
        };

        const information = {
          id_information: row[0],
          num_matricule: row[1],
          annee_universitaire_5: row[2],
          id_obs: row[5],
          id_niveau: row[3],
          groupe: row[4] + "",
        };

        newObservation.push(observation);
        newInformation.push(information);
      });
      setObservations(newObservation);
      setInformations(newInformation);
    };

    reader.readAsArrayBuffer(file);
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

  const handleArrangeData = async () => {
    const newObservations: Observation[] = [];
    const newInformations: Information[] = [];
    informationJson.forEach((info) => {
      const observation: Observation = {
        id_obs: info.id_obs,
        admis: info.admis,
        situation: info.situation,
        date_insc: new Date(info.date_insc).toISOString().slice(0, 10),
        date_arret: new Date(info.date_arret).toISOString().slice(0, 10),
      };
      const information: Information = {
        id_information: info.id_information,
        num_matricule: info.num_matricule,
        annee_universitaire_5: info.annee_universitaire,
        id_obs: info.id_obs,
        id_niveau: info.id_niveau,
        groupe: info.groupe,
      };
      newInformations.push(information);
      newObservations.push(observation);
    });
    setObservations(newObservations);
    setInformations(newInformations);
  };

  return (
    <div>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />{" "}
      <br />
      <button onClick={() => saveData()}>Save into the database</button> <br />
      <button onClick={() => deleteObs()}>Delete information</button> <br />
      <button onClick={() => saveInfo()}>Save info</button> <br />
      <button onClick={() => handleArrangeData()}>Arranger</button>
      <p>{observations.length}</p>
      <pre>{JSON.stringify(informations, null, 2)}</pre>
      <pre>{JSON.stringify(observations, null, 2)}</pre>
    </div>
  );
}

export default EtudiantInfo;

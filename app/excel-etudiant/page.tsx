"use client";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import Etudiant from "@/models/utilisateur/Etudiant";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import etudiantsJson from "@/public/json/etudiant.json";

function ExcelEtudiant() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
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

      jsonData.forEach((row: any[]) => {
        const utilisateur: Utilisateur = {
          id_utilisateur: row[0],
          photo_profil: row[1],
          nom: row[2],
          prenoms: row[3] || "",
          sexe: row[4] === "M" ? "Masculin" : "Féminin",
          adresse: row[5],
          telephone: row[6],
          email: row[7],
          mot_de_passe: row[8],
        };

        const etudiant: Etudiant = {
          num_matricule: row[9],
          date_naissance: "1970-01-01",
          lieu_naissance: row[11],
          nationalite: row[12],
          civilite: row[4] === "M" ? "Monsieaur" : "Mademoiselle",
          id_utilisateur: row[0],
        };

        newUtilisateurs.push(utilisateur);
        newEtudiants.push(etudiant);
      });

      setUtilisateurs(newUtilisateurs);
      setEtudiants(newEtudiants);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleArrangeEtudiant = async () => {
    const newUtilisateurs: Utilisateur[] = [];
    const newEtudiants: Etudiant[] = [];
    etudiantsJson.forEach((etudiant) => {
      const etudiant_data: Etudiant = {
        num_matricule: etudiant.num_matricule,
        date_naissance: etudiant.date_naissance,
        lieu_naissance: etudiant.lieu_naissance,
        nationalite: etudiant.nationalite,
        civilite: "",
        id_utilisateur: etudiant.id_utilisateur,
      };
      const utilisateur_data: Utilisateur = {
        id_utilisateur: etudiant.id_utilisateur,
        photo_profil: etudiant.photo_profil,
        nom: etudiant.nom,
        prenoms: etudiant.prenoms,
        sexe: etudiant.sexe,
        adresse: etudiant.adresse,
        telephone: etudiant.telephone,
        email: etudiant.email,
        mot_de_passe: etudiant.mot_de_passe,
      };
      newEtudiants.push(etudiant_data);
      newUtilisateurs.push(utilisateur_data);
    });
    setEtudiants(newEtudiants);
    setUtilisateurs(newUtilisateurs);
  };

  const deleteUser = async () => {
    if (etudiants.length > 0 && utilisateurs.length > 0) {
      utilisateurs.forEach(async (utilisateur) => {
        const response = await fetch(
          `/api/utilisateur/delete/${utilisateur.id_utilisateur}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log("Utilisateur supprimée avec succès");
        }
      });
    } else alert("Utilisateur et etudiants non définis");
  };

  const saveUser = async () => {
    if (etudiants.length > 0 && utilisateurs.length > 0) {
      const response = await fetch("/api/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateurs),
      });
      if (response.ok) {
        console.log("Tous les utilisateurs sont créés");
        const response = await fetch("/api/create_student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(etudiants),
        });
        if (response.ok) console.log("Tous les étudiants sont créés");
      }
    } else console.log("Utilisateur et etudiant non définis");
  };

  const findDuplicateEmails = () => {
    const emailMap = new Map();
    utilisateurs.forEach((utilisateur) => {
      if (emailMap.has(utilisateur.email)) {
        emailMap.set(utilisateur.email, emailMap.get(utilisateur.email) + 1);
      } else {
        emailMap.set(utilisateur.email, 1);
      }
    });

    emailMap.forEach((value, key) => {
      if (value > 1) {
        console.log(`L'email ${key} se répète ${value} fois.`);
      }
    });
  };

  const findDuplicateMatricules = () => {
    const matriculeMap = new Map();
    etudiants.forEach((etudiant) => {
      if (matriculeMap.has(etudiant.num_matricule)) {
        matriculeMap.set(
          etudiant.num_matricule,
          matriculeMap.get(etudiant.num_matricule) + 1
        );
      } else {
        matriculeMap.set(etudiant.num_matricule, 1);
      }
    });

    matriculeMap.forEach((value, key) => {
      if (value > 1) {
        console.log(`Le numéro de matricule ${key} se répète ${value} fois.`);
      }
    });
  };

  useEffect(() => {
    handleArrangeEtudiant();
  }, []);

  return (
    <div>
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />{" "}
      <br />
      <button onClick={() => saveUser()}>
        Enregister dans la base de données
      </button>{" "}
      <br />
      <button onClick={() => deleteUser()}>Supprimer utilisateurs</button>{" "}
      <br />
      <button onClick={() => findDuplicateEmails()}>
        Duplicate email
      </button>{" "}
      <br />
      <button onClick={() => findDuplicateMatricules()}>
        Duplicate num_matricule
      </button>
      <pre>{JSON.stringify(etudiants, null, 2)}</pre>
      <pre>{JSON.stringify(utilisateurs, null, 2)}</pre>
    </div>
  );
}

export default ExcelEtudiant;

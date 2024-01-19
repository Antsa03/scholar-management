"use client";
import React, { useState, useEffect, Fragment } from "react";
import { saveAs } from "file-saver";

function Json2Excel() {
  const [liste_note, setListeNote] = useState<any[]>();
  const fetchListeNote = async () => {
    try {
      const response = await fetch("/api/note_1/releve_note/etudiant");
      const data = await response.json();
      setListeNote(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListeNote();
  }, []);

  const checkListe = () => {
    if (liste_note) console.log(liste_note[0]);
  };

  const generateExcel = async () => {
    try {
      if (!liste_note) return;
      const response = await fetch("/api/xlsx", {
        method: "POST",
      });
      const excelBlob = await response.blob();
      alert("Excel générer avec succès");
      saveAs(excelBlob, `liste de note S${liste_note[0].semestre}.xlsx`);
    } catch (error) {
      console.error(error);
    }
  };

  if (liste_note)
    return (
      <div className="excel_note">
        <table>
          <thead>
            <tr>
              <th>Unité d'enseignement</th>
              {liste_note[0].unite_enseignements.map((ue: any) => (
                <td colSpan={ue.matieres.length + 1} key={ue.id_ue}>
                  {ue.designation_ue +
                    " S" +
                    ue.semestre_ue +
                    ": " +
                    ue.v_horaire_ue +
                    "h / " +
                    ue.credit +
                    " crédits"}
                </td>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Code matière</th>
              {liste_note[0].unite_enseignements.map((ue: any) => (
                <Fragment key={ue.id_ue}>
                  {ue.matieres.map((matiere: any) => (
                    <td key={matiere.code_matiere}>{matiere.code_matiere}</td>
                  ))}
                  <th>Moy UE</th>
                </Fragment>
              ))}
              <th>Moyenne semestre</th>
              {Array.from(new Set(liste_note.map((item) => item.semestre))).map(
                (semestre, index) => (
                  <th key={index}>{"Module à rattraper en S" + semestre}</th>
                )
              )}
            </tr>
            <tr>
              <th>Nom du module</th>
              {liste_note[0].unite_enseignements.map((ue: any) => (
                <Fragment key={ue.id_ue}>
                  {ue.matieres.map((matiere: any) => (
                    <td key={matiere.code_matiere}>
                      {matiere.designation_matiere}
                    </td>
                  ))}
                  <td></td>
                </Fragment>
              ))}
              {Array.from(new Set(liste_note.map((item) => item.semestre))).map(
                (semestre) => (
                  <td key={semestre}></td>
                )
              )}
            </tr>
            <tr>
              <th>Heures</th>
              {liste_note[0].unite_enseignements.map((ue: any) => (
                <Fragment key={ue.id_ue}>
                  {ue.matieres.map((matiere: any) => (
                    <td key={matiere.code_matiere}>
                      {matiere.v_horaire_matiere}
                    </td>
                  ))}
                  <td></td>
                </Fragment>
              ))}
              {Array.from(new Set(liste_note.map((item) => item.semestre))).map(
                (semestre) => (
                  <td key={semestre}></td>
                )
              )}
            </tr>
            <tr>
              <th>Crédits</th>
              {liste_note[0].unite_enseignements.map((ue: any) => (
                <Fragment key={ue.id_ue}>
                  {ue.matieres.map((matiere: any) => (
                    <td key={matiere.code_matiere}>{matiere.coeff}</td>
                  ))}
                  <td></td>
                </Fragment>
              ))}
              {Array.from(new Set(liste_note.map((item) => item.semestre))).map(
                (semestre) => (
                  <th key={semestre}></th>
                )
              )}
            </tr>
            <tr>
              <th>Nom et prénoms</th>
              {liste_note[0].unite_enseignements.map((ue: any) => (
                <Fragment key={ue.id_ue}>
                  {ue.matieres.map((matiere: any) => (
                    <td key={matiere.code_matiere}></td>
                  ))}
                </Fragment>
              ))}
              {Array.from(new Set(liste_note.map((item) => item.semestre))).map(
                (semestre) => (
                  <th key={semestre}></th>
                )
              )}
            </tr>
            {liste_note.map((liste: any) => (
              <tr>
                <td key={liste.num_matricule}>
                  {liste.nom + " " + liste.prenoms}
                </td>
                {liste.unite_enseignements.map((ue: any) => (
                  <Fragment key={ue.id_ue}>
                    {ue.matieres.map((matiere: any) => (
                      <td key={matiere.code_matiere}>{matiere.note_matiere}</td>
                    ))}
                    <td>{ue.moy_ue}</td>
                  </Fragment>
                ))}
                <td>{Number(liste.moy_semestre).toFixed(2)}</td>
                <td>
                  {liste.matiere_rattr.map((mat_ratt: string) => (
                    <Fragment key={mat_ratt}>
                      <span>{mat_ratt}</span> <br />
                    </Fragment>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => generateExcel()}>Générer l'excel</button>
        <button onClick={() => checkListe()}>Check</button>
      </div>
    );
  else <h1>Aucun donnée à afficher</h1>;
}

export default Json2Excel;

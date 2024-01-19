import React, { Fragment } from "react";

interface Note_ListeProps {
  liste_note: any[];
  generateExcel: Function;
}

function Note_Liste({ liste_note, generateExcel }: Note_ListeProps) {
  if (
    !liste_note ||
    liste_note.length === 0
    // !liste_note[0] ||
    // typeof liste_note[0].unite_enseignements === "undefined"
  )
    return <h1> Notes non définit </h1>;
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
            <th>Module à rattraper</th>
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
    </div>
  );
}

export default Note_Liste;

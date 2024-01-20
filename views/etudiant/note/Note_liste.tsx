import Etudiant_liste_note from "@/models/etudiant/note/Etudiant_liste_note";
import React, { Fragment } from "react";

interface Note_listeProps {
  notes: Etudiant_liste_note[];
  save: Function;
}

function Note_liste({ notes, save }: Note_listeProps) {
  return (
    <div className="w-full">
      {notes.map((note, index) => (
        <div
          key={index}
          className="flex flex-col gap-12 -bg--bg-primary-color rounded-md"
        >
          <div className="p-12 shadow-md rounded-md flex flex-col ">
            <div className="flex flex-col gap-1 mb-8">
              <p className="text-3xl font-bold tracking-wider">
                {note.designation_niveau}
              </p>
              <h2 className="text-xl tracking-wider font-semibold -text--text-blue-color">
                Année universitaire: {note.annee_universitaire_2}, Semestre{" "}
                {note.semestre}
              </h2>
            </div>
            <table>
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Code matière</th>
                  <th className="table-header-cell">Designation matière</th>
                  <th className="table-header-cell">Coeff</th>
                  <th className="table-header-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                {note.unite_enseignements.map((ue) => (
                  <Fragment key={ue.id_ue}>
                    <tr className="table-row">
                      <th colSpan={4}>
                        {ue.designation_ue +
                          " S" +
                          ue.semestre_ue +
                          " / " +
                          ue.credit +
                          " crédits"}
                      </th>
                    </tr>
                    {ue.matieres.map((matiere) => (
                      <tr key={matiere.code_matiere}>
                        <td>{matiere.code_matiere}</td>
                        <td>{matiere.designation_matiere}</td>
                        <td>{matiere.coeff}</td>
                        <td>{matiere.note_matiere}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
            <button
              className="button-add-info self-end mt-8"
              onClick={() => save(note)}
            >
              Télécharger le relevé de note
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Note_liste;

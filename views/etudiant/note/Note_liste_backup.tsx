import Etudiant_liste_note from "@/models/etudiant/note/Etudiant_liste_note";
import React, { Fragment } from "react";

interface Note_listeProps {
  notes: Etudiant_liste_note[];
}

function Note_liste({ notes }: Note_listeProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Code matière</th>
            <th>Designation matière</th>
            <th>Coeff</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <Fragment key={index}>
              {note.unite_enseignements.map((ue) => (
                <Fragment key={ue.id_ue}>
                  <tr>
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
                    <tr>
                      <td>{matiere.code_matiere}</td>
                      <td>{matiere.designation_matiere}</td>
                      <td>{matiere.coeff}</td>
                      <td>{matiere.note_matiere}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Note_liste;

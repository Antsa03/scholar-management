import Noter_1 from "@/models/note_1/Noter_1";
import React from "react";
import Link from "next/link";

interface NoteListProps {
  noter_1: Noter_1[];
  handleDelete: Function;
}

function NoteList({ noter_1, handleDelete }: NoteListProps) {
  return (
    <div>
      <h1>Listage des notes</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th># calendrier_2</th>
            <th>N° matricule</th>
            <th>Code matière</th>
            <th>Note matière</th>
          </tr>
        </thead>
        <tbody>
          {noter_1.map((noter, index) => (
            <tr key={index}>
              <td>{noter.id_noter_1}</td>
              <td>{noter.id_calendrier_2}</td>
              <td>{noter.num_matricule}</td>
              <td>{noter.code_matiere}</td>
              <td>{noter.note_matiere}</td>
              <td>
                <Link href={`/note/edit/${noter.id_noter_1}`}>Modifier</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(noter.id_noter_1)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NoteList;

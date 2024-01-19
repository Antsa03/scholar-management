import Calendrier_2 from "@/models/note_1/Calendrier_2";
import React from "react";
import Link from "next/link";

interface Calendrier_2_ListProps {
  calendrier_2: Calendrier_2[];
  handleDelete: Function;
}

function Calendrier_2_List({
  calendrier_2,
  handleDelete,
}: Calendrier_2_ListProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Année universitaire</th>
            <th>Semestre</th>
            <th>Session</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {calendrier_2.map((calendrier_2, index) => (
            <tr key={index}>
              <td>{calendrier_2.id_calendrier_2}</td>
              <td>{calendrier_2.annee_universitaire_2}</td>
              <td>{calendrier_2.semestre}</td>
              <td>{calendrier_2.session}</td>
              <td>
                <Link
                  href={`/note/calendrier_2/edit/${calendrier_2.id_calendrier_2}`}
                >
                  Modifier
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(calendrier_2.id_calendrier_2)}
                >
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

export default Calendrier_2_List;

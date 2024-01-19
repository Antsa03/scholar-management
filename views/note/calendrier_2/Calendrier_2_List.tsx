import Calendrier_2 from "@/models/note_1/Calendrier_2";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface Calendrier_2_ListProps {
  calendrier_2: Calendrier_2[];
  handleDelete: Function;
}

function Calendrier_2_List({
  calendrier_2,
  handleDelete,
}: Calendrier_2_ListProps) {
  return (
    <div className="flex flex-col  relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des calendrier_2
        </h1>
      </div>
      <div className="container-table mt-5">
        {" "}
        <table className="custom-table ">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">Année universitaire</th>
              <th className="table-header-cell">Semestre</th>
              <th className="table-header-cell">Session</th>
              <th colSpan={3} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {calendrier_2.map((calendrier_2, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">
                  {calendrier_2.id_calendrier_2}
                </td>
                <td className="table-row-cell">
                  {calendrier_2.annee_universitaire_2}
                </td>
                <td className="table-row-cell">{calendrier_2.semestre}</td>
                <td className="table-row-cell">{calendrier_2.session}</td>
                <td>
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/note/calendrier_2/edit/${calendrier_2.id_calendrier_2}`}
                      className="link-edit"
                    >
                      <FontAwesomeIcon
                        className="icon-fa-edit "
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(calendrier_2.id_calendrier_2)}
                    className="tooltip-supprimer link-delete"
                    data-tooltip="Supprimer"
                  >
                    <FontAwesomeIcon
                      className="icon-fa-delete"
                      icon={faTrash}
                      fontSize={28}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
}

export default Calendrier_2_List;

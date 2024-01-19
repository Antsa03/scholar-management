import Demande_absence from "@/models/demande_absence/Demande_absence";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface Demande_absence_ListProps {
  demande_absences: Demande_absence[];
  handleDelete: Function;
}

function Demande_absence_List({
  demande_absences,
  handleDelete,
}: Demande_absence_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des demandes d'absence
        </h1>
      </div>
      <div className="container-table mt-5">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell">Motif</th>
              <th className="table-header-cell">Date demandée</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {demande_absences.map((demande_absence, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">
                  {demande_absence.id_demande_absence}
                </td>
                <td className="table-row-cell">
                  {demande_absence.num_matricule}
                </td>
                <td className="table-row-cell">{demande_absence.motif}</td>
                <td className="table-row-cell">
                  {demande_absence.date_demandee}
                </td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/demande_absence/edit/${demande_absence.id_demande_absence}`}
                      className="link-edit"
                    >
                      <FontAwesomeIcon
                        className="icon-fa-edit"
                        icon={faEdit}
                        fontSize={28}
                      />
                    </Link>
                  </button>
                </td>
                <td className="table-row-cell">
                  <button
                    onClick={() =>
                      handleDelete(demande_absence.id_demande_absence)
                    }
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
        </table>
      </div>
    </div>
  );
}

export default Demande_absence_List;

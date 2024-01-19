import Parcours from "@/models/pedagogie/Parcours";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface ParcoursListProps {
  parcours: Parcours[];
  handleDelete: Function;
}

function ParcoursList({ parcours, handleDelete }: ParcoursListProps) {
  return (
    <div className="w-[700px]">
      <h1 className="h1 flex flex-row items-center gap-2 mb-5">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Listage des parcours
      </h1>
      <div className="container-table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID parcours</th>
              <th className="table-header-cell">Désignation parcours</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {parcours.map((parcours, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell"> {parcours.id_parcours}</td>
                <td className="table-row-cell">
                  {parcours.designation_parcours}
                </td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/pedagogie/edit/${parcours.id_parcours}`}
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

                <td className="px-1 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(parcours.id_parcours)}
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

export default ParcoursList;

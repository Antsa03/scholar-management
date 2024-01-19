import Niveau from "@/models/pedagogie/Niveau";
import React from "react";
import Link from "next/link";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronsRight, Search } from "react-feather";

interface NiveauList {
  niveaux: Niveau[];
  handleDelete: Function;
}

function NiveauList({ niveaux, handleDelete }: NiveauList) {
  return (
    <div className="w-[750px]">
      <h1 className="h1 flex flex-row items-center gap-2 mb-5">
        <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
        Listage des niveaux
      </h1>
      <div className="container-table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID niveau</th>
              <th className="table-header-cell">Désignation du niveau</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {niveaux.map((niveau, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{niveau.id_niveau}</td>
                <td className="table-row-cell">{niveau.designation_niveau}</td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/pedagogie/edit/${niveau.id_niveau}`}
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
                <td className="table-row-cell">
                  <button
                    onClick={() => handleDelete(niveau.id_niveau)}
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

export default NiveauList;

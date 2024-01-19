import Composer_1 from "@/models/composition/Composer_1";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface Composition1_ListProps {
  composer_1: Composer_1[];
  handleDelete: Function;
}

function Composition1_List({
  composer_1,
  handleDelete,
}: Composition1_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des composition_1
        </h1>
      </div>
      <div className="mt-5 container-table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell"># unité d'enseignement</th>
              <th className="table-header-cell">Année universitaire</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {composer_1.map((composer_1, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{composer_1.id_composer_1}</td>
                <td className="table-row-cell">{composer_1.code_matiere}</td>
                <td className="table-row-cell">{composer_1.id_ue}</td>
                <td className="table-row-cell">
                  {composer_1.annee_universitaire_1}
                </td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/composition/composition_1/edit/${composer_1.id_composer_1}`}
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
                    onClick={() => handleDelete(composer_1.id_composer_1)}
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

export default Composition1_List;

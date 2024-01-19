import Composer_3 from "@/models/composition/Composer_3";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface Composition3_ListProps {
  composer_3: Composer_3[];
  handleDelete: Function;
}

function Composition3_List({
  composer_3,
  handleDelete,
}: Composition3_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des composition_3
        </h1>
      </div>
      <div className="mt-6 container-table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">ID niveau</th>
              <th className="table-header-cell">ID parcours</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {composer_3.map((composer_3, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{composer_3.id_composer_3}</td>
                <td className="table-row-cell">{composer_3.id_niveau}</td>
                <td className="table-row-cell"> {composer_3.id_parcours}</td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/composition/composition_3/edit/${composer_3.id_composer_3}`}
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
                    onClick={() => handleDelete(composer_3.id_composer_3)}
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

export default Composition3_List;

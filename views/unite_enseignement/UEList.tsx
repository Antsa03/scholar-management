import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface UEListProps {
  unite_enseignements: Unite_enseignement[];
  handleDelete: Function;
  handleRecherche_ue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function UEList({
  unite_enseignements,
  handleDelete,
  handleRecherche_ue,
  handleRecherche,
}: UEListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des UE
        </h1>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={handleRecherche_ue}
          />
          <button className="btn-search">
            <Search></Search>
          </button>
        </form>
      </div>

      <div className="container-table mt-5">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">
                Désignation d'unité d'enseignement
              </th>
              <th className="table-header-cell">Crédit</th>
              <th className="table-header-cell">Semestre de l'UE</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {unite_enseignements.map((unite_enseignement, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{unite_enseignement.id_ue}</td>
                <td className="table-row-cell">
                  {unite_enseignement.designation_ue}
                </td>
                <td className="table-row-cell">{unite_enseignement.credit}</td>
                <td className="table-row-cell">
                  S{unite_enseignement.semestre_ue}
                </td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/unite_enseignement/edit/${unite_enseignement.id_ue}`}
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
                    onClick={() => handleDelete(unite_enseignement.id_ue)}
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

export default UEList;

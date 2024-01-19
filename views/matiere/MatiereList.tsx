import Matiere from "@/models/enseignement/Matiere";
import React from "react";
import Link from "next/link";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronsRight, Search } from "react-feather";

interface MatiereListProps {
  matieres: Matiere[];
  handleDelete: Function;
  handleRecherche_matiere: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function MatiereList({
  matieres,
  handleDelete,
  handleRecherche_matiere,
  handleRecherche,
}: MatiereListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des matières
        </h1>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={handleRecherche_matiere}
          />
          <button className="btn-search">
            <Search></Search>
          </button>
        </form>
      </div>
      <div className="mt-6 container-table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell">Désignation matière</th>
              <th className="table-header-cell">Coefficient</th>
              <th className="table-header-cell">Crédit de la matière</th>
              <th className="table-header-cell">Volume horaire</th>
              <th className="table-header-cell">ID enseignant</th>
              <th colSpan={3} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {matieres.map((matiere, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{matiere.code_matiere}</td>
                <td className="table-row-cell">
                  {matiere.designation_matiere}
                </td>
                <td className="table-row-cell">{matiere.coeff}</td>
                <td className="table-row-cell">{matiere.credit_matiere}</td>
                <td className="table-row-cell">
                  {matiere.v_horaire_matiere} h
                </td>
                <td className="table-row-cell">{matiere.id_enseignant}</td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/matiere/edit/${matiere.code_matiere}`}
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
                    onClick={() => handleDelete(matiere.code_matiere)}
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

export default MatiereList;

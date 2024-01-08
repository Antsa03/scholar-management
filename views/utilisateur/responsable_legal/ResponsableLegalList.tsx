import Responsable_legal from "@/models/utilisateur/listage/Responsable_legal";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface ResponsableLegalListProps {
  responsable_legals: Responsable_legal[];
  handleDelete: Function;
  handleRecherche_responsable_legal: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function ResponsableLegalList({
  responsable_legals,
  handleDelete,
  handleRecherche_responsable_legal,
  handleRecherche,
}: ResponsableLegalListProps) {
  return (
    <div className="flex flex-col relative text-center w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des responsables légales
        </h1>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={handleRecherche_responsable_legal}
          />
          <button className="btn-search">
            <Search></Search>
          </button>
        </form>
      </div>

      <div className="container-table">
        <table className="custom-table mt-5">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell"># Responsable</th>
              <th className="table-header-cell">Nom</th>
              <th className="table-header-cell">Prénoms</th>
              <th className="table-header-cell">Sexe</th>
              <th className="table-header-cell">Profession</th>
              <th className="table-header-cell">Adresse</th>
              <th className="table-header-cell">Téléphone</th>
              <th className="table-header-cell">Email</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {responsable_legals.map((responsable_legal, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">
                  {responsable_legal.id_utilisateur}
                </td>
                <td className="table-row-cell">
                  {responsable_legal.id_reponsable_legal}
                </td>
                <td className="table-row-cell">{responsable_legal.nom}</td>
                <td className="table-row-cell">{responsable_legal.prenoms}</td>
                <td className="table-row-cell">{responsable_legal.sexe}</td>
                <td className="table-row-cell">
                  {responsable_legal.profession}
                </td>
                <td className="table-row-cell">{responsable_legal.adresse}</td>
                <td className="table-row-cell">
                  {responsable_legal.telephone}
                </td>
                <td className="table-row-cell-email">
                  {responsable_legal.email}
                </td>
                <td className="px-1 py-4 whitespace-nowrap text-[13px]">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/utilisateur/responsable_legal/edit/${responsable_legal.id_utilisateur}/${responsable_legal.id_reponsable_legal}`}
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

                <td className="px-1 py-4 whitespace-nowrap text-[13px]">
                  <button
                    onClick={() =>
                      handleDelete(responsable_legal.id_utilisateur)
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

export default ResponsableLegalList;

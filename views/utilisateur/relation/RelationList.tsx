import React from "react";
import Relation from "@/models/utilisateur/listage/Relation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface RelationListProps {
  relations: Relation[];
  handleDeleteRelation: Function;
  handleRecherche_relation: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function RelationList({
  relations,
  handleDeleteRelation,
  handleRecherche_relation,
  handleRecherche,
}: RelationListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des relations parentales
        </h1>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={handleRecherche_relation}
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
              <th className="table-header-cell">ID Relation</th>
              <th className="table-header-cell">ID Responsable légal</th>
              <th className="table-header-cell">Nom du responsable légal</th>
              <th className="table-header-cell">
                Prénoms du responsable légal
              </th>
              <th className="table-header-cell">N° matricule de l'étudiant</th>
              <th className="table-header-cell">Nom de l'étudiant</th>
              <th className="table-header-cell">Prénoms de l'étudiant</th>
              <th className="table-header-cell" colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {relations.map((relation, index) => (
              <tr className="table-row" key={index}>
                <td className="table-row-cell">{relation.id_relation}</td>
                <td className="table-row-cell">
                  {relation.id_responsable_legal}
                </td>
                <td className="table-row-cell">
                  {relation.nom_responsable_legal}
                </td>
                <td className="table-row-cell">
                  {relation.prenoms_responsable_legal}
                </td>
                <td className="table-row-cell">{relation.num_matricule}</td>
                <td className="table-row-cell">{relation.nom_etudiant}</td>
                <td className="table-row-cell">{relation.prenoms_etudiant}</td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/utilisateur/relation/edit/${relation.id_relation}`}
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
                <td>
                  <button
                    onClick={() => handleDeleteRelation(relation.id_relation)}
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

export default RelationList;

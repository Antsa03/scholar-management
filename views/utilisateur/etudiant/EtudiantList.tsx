import Etudiant from "@/models/utilisateur/listage/Etudiant";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEdit,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Hashtag from "../../../public/img/hashtag.png";
import Image from "next/image";
import { ChevronRight, ChevronsRight, Search } from "react-feather";

interface EtudiantListProps {
  etudiants: Etudiant[];
  handleDelete: Function;
  handleRecherche_etudiant: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function EtudiantList({
  etudiants,
  handleDelete,
  handleRecherche_etudiant,
  handleRecherche,
}: EtudiantListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des étudiants
        </h1>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            onChange={handleRecherche_etudiant}
            className="search-bar-input"
          />
          <button className="btn-search">
            <Search></Search>
          </button>
        </form>
        <div className="w-1 rounded-md h-12 bg-black "> </div>
        <Link
          href={"/utilisateur/etudiant/information/ajout"}
          className="button-add-info block self-center"
        >
          <FontAwesomeIcon
            className={`" text-white cursor-pointer" `}
            icon={faAdd}
            fontSize={16}
          />
          Ajout d'information de l'étudiant
        </Link>
      </div>

      <div className="container-table">
        <table className="custom-table mt-6">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell max-w-[140px] break-words">
                Nom
              </th>
              <th className="table-header-cell max-w-[140px] break-words">
                Prénoms
              </th>
              <th className="table-header-cell">Sexe</th>
              <th className="table-header-cell">Date de naissance</th>
              <th className="table-header-cell">Lieu de naissance</th>
              <th className="table-header-cell">Adresse</th>
              <th className="table-header-cell">Téléphone</th>
              <th className="table-header-cell">Nationalité</th>
              <th className="table-header-cell">Civilité</th>
              <th className="table-header-cell max-w-[160px] break-words">
                Email
              </th>
              <th colSpan={3} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map((etudiant, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{etudiant.id_utilisateur}</td>
                <td className="table-row-cell">{etudiant.num_matricule}</td>
                <td className="table-row-cell max-w-[140px] break-words">
                  {etudiant.nom}
                </td>
                <td className="table-row-cell max-w-[140px] break-words">
                  {etudiant.prenoms}
                </td>
                <td className="table-row-cell">{etudiant.sexe}</td>
                <td className="table-row-cell">
                  {etudiant.date_naissance.toLocaleString().slice(0, 10)}
                </td>
                <td className="table-row-cell">{etudiant.lieu_naissance}</td>
                <td className="table-row-cell">{etudiant.adresse}</td>
                <td className="table-row-cell">{etudiant.telephone}</td>
                <td className="table-row-cell">{etudiant.nationalite}</td>
                <td className="table-row-cell">{etudiant.civilite}</td>
                <td className="table-row-cell-email max-w-[160px] break-words">
                  {etudiant.email}
                </td>
                <td className="table-row-cell">
                  <Link
                    href={`/utilisateur/etudiant/information/${etudiant.num_matricule}`}
                    className="button-info"
                    data-tooltip="Voir plus d'info"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    Info
                  </Link>
                </td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/utilisateur/etudiant/edit/${etudiant.id_utilisateur}/${etudiant.num_matricule}`}
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
                    onClick={() => handleDelete(etudiant.id_utilisateur)}
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

export default EtudiantList;

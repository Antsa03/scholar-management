import Enseignant from "@/models/utilisateur/listage/Enseignant";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface EnseignantListProps {
  enseignants: Enseignant[];
  handleDelete: Function;
  handleRecherche_enseignant: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function EnseignantList({
  enseignants,
  handleDelete,
  handleRecherche_enseignant,
  handleRecherche,
}: EnseignantListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des enseignants
        </h1>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={handleRecherche_enseignant}
          />
          <button className="btn-search">
            <Search></Search>
          </button>
        </form>
      </div>

      <div className="container-table">
        <table className="custom-table w-full">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell"># Enseignant</th>
              <th className="table-header-cell">Nom</th>
              <th className="table-header-cell">Prénoms</th>
              <th className="table-header-cell">Sexe</th>
              <th className="table-header-cell">Grade</th>
              <th className="table-header-cell">Diplôme</th>
              <th className="table-header-cell">Spécialité</th>
              <th className="table-header-cell">Date de recrutement</th>
              <th className="table-header-cell">Date d'arrêt d'enseignement</th>
              <th className="table-header-cell">Adresse</th>
              <th className="table-header-cell">Téléphone</th>
              <th className="table-header-cell">Email</th>
              <th colSpan={3} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {enseignants.map((enseignant) => (
              <tr key={enseignant.id_utilisateur} className="table-row">
                <td className="table-row-cell">{enseignant.id_utilisateur}</td>
                <td className="table-row-cell">{enseignant.id_enseignant}</td>
                <td className="table-row-cell">{enseignant.nom}</td>
                <td className="table-row-cell">{enseignant.prenoms}</td>
                <td className="table-row-cell">{enseignant.sexe}</td>
                <td className="table-row-cell">{enseignant.grade}</td>
                <td className="table-row-cell">{enseignant.diplome}</td>
                <td className="table-row-cell">{enseignant.specialite}</td>
                <td className="table-row-cell">
                  {enseignant.date_recrutement}
                </td>
                <td className="table-row-cell">{enseignant.date_arret_ens}</td>
                <td className="table-row-cell">{enseignant.adresse}</td>
                <td className="table-row-cell">{enseignant.telephone}</td>
                <td className="table-row-cell">{enseignant.email}</td>
                <td className="table-row-cell">
                  <Link
                    href={`/utilisateur/enseignant/${enseignant.id_enseignant}`}
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
                      href={`/utilisateur/enseignant/edit/${enseignant.id_utilisateur}/${enseignant.id_enseignant}`}
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
                    onClick={() => handleDelete(enseignant.id_utilisateur)}
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

export default EnseignantList;

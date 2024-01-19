import React from "react";
import Link from "next/link";
import { ChevronsRight, Search } from "react-feather";
import Etudiant from "@/models/note_1/listage-etudiants/Etudiant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface Search {
  search_value: string;
}

interface EtudiantListProps {
  etudiants: Etudiant[];
  handleRecherche_etudiant: Function;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

function EtudiantList({
  etudiants,
  handleRecherche_etudiant,
  handleSearch,
}: EtudiantListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des étudiants pour générer un relevé des notes
        </h1>
      </div>
      <div className="flex flex-row gap-8 ml-32">
        <form className="flex flex-row w-fit z-0" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={(e) => handleRecherche_etudiant(e)}
          />
          <button className="btn-search" type="submit">
            <Search></Search>
          </button>
        </form>
      </div>

      <div className="container-table mt-6">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell"># calendrier_2</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell">Année universitaire</th>
              <th className="table-header-cell">Semestre</th>
              <th className="table-header-cell">Nom</th>
              <th className="table-header-cell">Prénoms</th>
              <th className="table-header-cell">Niveau</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map((etudiant, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{etudiant.id_calendrier_2}</td>
                <td className="table-row-cell">{etudiant.num_matricule}</td>
                <td className="table-row-cell">
                  {etudiant.annee_universitaire}
                </td>
                <td className="table-row-cell">{etudiant.semestre}</td>
                <td className="table-row-cell">{etudiant.nom}</td>
                <td className="table-row-cell">{etudiant.prenoms}</td>
                <td className="table-row-cell">{etudiant.niveau}</td>
                <td className="table-row-cell">
                  <Link
                    href={`/note/releve_note/${etudiant.num_matricule}/${etudiant.id_calendrier_2}`}
                    className="button-info"
                    data-tooltip="Voir le relevé de note"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    Voir
                  </Link>
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

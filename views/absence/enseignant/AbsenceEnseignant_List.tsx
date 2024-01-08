import Absence_enseignant from "@/models/absence/enseignant/listage/Absence_enseignant";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";

interface AbsenceEnseignant_ListProps {
  absence_enseignants: Absence_enseignant[];
  handleDelete: Function;
  handleRecherche_absence_enseignant: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function AbsenceEnseignant_List({
  absence_enseignants,
  handleDelete,
  handleRecherche_absence_enseignant,
  handleRecherche,
}: AbsenceEnseignant_ListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des absences enseignants
        </h1>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={handleRecherche_absence_enseignant}
          />
          <button className=" btn-search">
            <Search></Search>
          </button>
        </form>
      </div>
      <div className="flex flex-col relative text-center w-full mt-5">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">ID calendrier_4</th>
              <th className="table-header-cell">
                Date de début d'absence enseignant
              </th>
              <th className="table-header-cell">
                Heure de début d'absence enseignant
              </th>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell">
                Date de fin d'absence enseignant
              </th>
              <th className="table-header-cell">
                Heure de fin d'absence enseignant
              </th>
              <th className="table-header-cell">Justifiée</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {absence_enseignants.map((absence_enseignant, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">
                  {absence_enseignant.id_absence_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.id_calendrier_4}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.date_deb_abs_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.heure_deb_abs_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.code_matiere}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.date_fin_abs_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.heure_fin_abs_ens}
                </td>
                <td className="table-row-cell">
                  {absence_enseignant.justifiee_ens}
                </td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/absence/enseignant/edit/${absence_enseignant.id_calendrier_4}/${absence_enseignant.id_absence_ens}`}
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
                    onClick={() =>
                      handleDelete(absence_enseignant.id_calendrier_4)
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

export default AbsenceEnseignant_List;

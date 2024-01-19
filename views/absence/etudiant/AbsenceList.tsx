import Absence from "@/models/absence/etudiant/listage/Absence";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Search } from "react-feather";
import { UseFormRegister } from "react-hook-form";
import AbsenceEtudiantFiltre from "@/models/filtrage/absence/AbsenceEtudiantFiltre";

interface AbsenceListProps {
  absences: Absence[];
  handleDelete: Function;
  groupes: string[];
  annee_universitaire: string[];
  register: UseFormRegister<AbsenceEtudiantFiltre>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  listAll: () => void;
  handleRecherche_absence: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
}

function AbsenceList({
  absences,
  handleDelete,
  groupes,
  annee_universitaire,
  register,
  handleSubmit,
  listAll,
  handleRecherche_absence,
  handleRecherche,
}: AbsenceListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className="ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2  mb-5">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des absences étudiants
        </h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-4 w-full"
          >
            <div className="h2">Choix de filtre</div>
            <div className="w-full flex flex-row items-center gap-4">
              {" "}
              <select {...register("groupe")} className="select-form">
                <option value="">Sélectionnez le groupe</option>
                {groupes.map((groupe, index) => (
                  <option key={index} value={groupe}>
                    {groupe}
                  </option>
                ))}
              </select>
              <select
                {...register("annee_universitaire")}
                className="select-form"
              >
                <option value="">Sélectionnez une année universitaire</option>
                {annee_universitaire.map((ann_univ, index) => (
                  <option key={index} value={ann_univ}>
                    {ann_univ}
                  </option>
                ))}
              </select>
              <select {...register("type_absence")} className="select-form">
                <option value="">Sélectionner le type d'absence</option>
                <option value="Cours">Cours</option>
                <option value="Examen">Examen</option>
              </select>
              <button
                type="submit"
                className="flex flex-row self-center h-[44px] px-4  gap-2 items-center justify-center  text-white tracking-wider  rounded-md  transition-all delay-75 ease-in-out bg-teal-700 hover:bg-teal-700/90 hover:scale-105"
              >
                OK
              </button>
              <button onClick={listAll} className="btn-list-all block">
                Tout lister
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="ml-32 flex flex-row gap-8">
        <form className="flex flex-row w-fit z-0" onSubmit={handleRecherche}>
          <input
            type="text"
            placeholder="Recherche"
            className="search-bar-input"
            onChange={handleRecherche_absence}
          />
          <button className="btn-search">
            <Search></Search>
          </button>
        </form>
      </div>
      <div className="container-table">
        <table className="custom-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID absence</th>
              <th className="table-header-cell">ID calendrier_3</th>
              <th className="table-header-cell">Date de début de l'absence</th>
              <th className="table-header-cell">Heure de début de l'absence</th>
              <th className="table-header-cell">N° matricule</th>
              <th className="table-header-cell">Code matière</th>
              <th className="table-header-cell">Type d'absence</th>
              <th className="table-header-cell">Date de fin d'absence</th>
              <th className="table-header-cell">Heure de fin d'absence</th>
              <th className="table-header-cell">Justifiée</th>
              <th colSpan={2} className="table-header-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {absences.map((absence, index) => (
              <tr key={index} className="table-row">
                <td className="table-row-cell">{absence.id_absence}</td>
                <td className="table-row-cell">{absence.id_calendrier_3}</td>
                <td className="table-row-cell">{absence.date_deb_abs}</td>
                <td className="table-row-cell">{absence.heure_deb_abs}</td>
                <td className="table-row-cell">{absence.num_matricule}</td>
                <td className="table-row-cell">{absence.code_matiere}</td>
                <td className="table-row-cell">{absence.type_absence}</td>
                <td className="table-row-cell">{absence.date_fin_abs}</td>
                <td className="table-row-cell">{absence.heure_fin_abs}</td>
                <td className="table-row-cell">{absence.justifiee}</td>
                <td className="table-row-cell">
                  <button className="tooltip-modifier" data-tooltip="Modifier">
                    <Link
                      href={`/absence/etudiant/edit/${absence.id_calendrier_3}/${absence.id_absence}`}
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
                    onClick={() => handleDelete(absence.id_calendrier_3)}
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

export default AbsenceList;

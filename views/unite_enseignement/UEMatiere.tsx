import React, { ChangeEvent, FormEvent, Fragment } from "react";
import { ChevronsRight, Search } from "react-feather";
import Annee_UE_Matiere from "@/models/enseignement/Annee_UE_Matiere";
import Composer_1 from "@/models/composition/Composer_1";

interface UEListProps {
  annee_ue_matiere?: Annee_UE_Matiere[];
  handleRecherche_ue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRecherche: (event: React.FormEvent<HTMLFormElement>) => void;
  recuperationAU: Composer_1[];
  onChangeFilter: Function;
  handleFilter: (event: FormEvent<HTMLFormElement>) => void;
  listAll: () => void;
}

export default function UEMatiere({
  annee_ue_matiere,
  handleRecherche_ue,
  handleRecherche,
  recuperationAU,
  onChangeFilter,
  handleFilter,
  listAll,
}: UEListProps) {
  return (
    <div className="flex flex-col relative w-full">
      <div className=" ml-32 mb-5">
        <h1 className="h1 flex flex-row items-center gap-2 ">
          <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
          Liste des UE avec matière
        </h1>
      </div>
      <div className="ml-32 mb-4">
        <form
          onSubmit={handleFilter}
          className="flex flex-col items-start gap-4 w-full"
        >
          <div className="h2">Choix de filtre</div>
          <div className="w-full flex flex-row items-center gap-4">
            <select
              name="filter"
              onChange={(event) => onChangeFilter(event)}
              className="select-form"
            >
              <option value="">Sélectionner une année universitaire</option>
              {recuperationAU.map((annee_univ) => (
                <option
                  key={annee_univ.id_composer_1}
                  value={annee_univ.annee_universitaire_1}
                >
                  {annee_univ.annee_universitaire_1}
                </option>
              ))}
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
      <div className="ml-32 mb-4 flex flex-row gap-8">
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

      {annee_ue_matiere?.map((annee_ue_matiere) => (
        <Fragment key={annee_ue_matiere.annee_universitaire_1}>
          <h2 className="h2">
            Année universitaire: {annee_ue_matiere.annee_universitaire_1}
          </h2>
          <div className="container-table">
            <table className="custom-table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell-ue-matiere">#</th>
                  <th className="table-header-cell-ue-matiere">
                    Désignation d'unité d'enseignement
                  </th>
                  <th className="table-header-cell-ue-matiere" colSpan={2}>
                    Crédit
                  </th>
                  <th className="table-header-cell-ue-matiere">
                    Semestre de l'UE
                  </th>
                </tr>
              </thead>
              <tbody>
                {annee_ue_matiere.ue_matieres.map(
                  (unite_enseignement, index) => (
                    <Fragment key={index}>
                      <tr key={index} className="bg-gray-200">
                        <td className="table-row-cell-ue-matiere">
                          {unite_enseignement.id_ue}
                        </td>
                        <td className="table-row-cell">
                          {unite_enseignement.designation_ue}
                        </td>
                        <td className="table-row-cell" colSpan={2}>
                          {unite_enseignement.credit}
                        </td>
                        <td className="table-row-cell">
                          S{unite_enseignement.semestre_ue}
                        </td>
                      </tr>
                      <tr className="bg-blue-100">
                        <th
                          colSpan={5}
                          className="table-header-cell-text-center-ue-matiere"
                        >
                          Composition de matières dans l'UE
                        </th>
                      </tr>
                      <tr className="table-header-ue-matiere">
                        <th className="table-header-cell">Code matière</th>
                        <th className="table-header-cell">
                          Désignation matière
                        </th>
                        <th className="table-header-cell">Coefficient</th>
                        <th className="table-header-cell">
                          Crédit de la matière
                        </th>
                        <th className="table-header-cell">
                          Volume horaire de la matière
                        </th>
                      </tr>
                      {unite_enseignement.matieres.map((matiere, index) => (
                        <tr key={index}>
                          <td className="table-row-cell">
                            {matiere.code_matiere}
                          </td>
                          <td className="table-row-cell">
                            {matiere.designation_matiere}
                          </td>
                          <td className="table-row-cell">{matiere.coeff}</td>
                          <td className="table-row-cell">
                            {matiere.credit_matiere}
                          </td>
                          <td className="table-row-cell">
                            {matiere.v_horaire_matiere}h
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

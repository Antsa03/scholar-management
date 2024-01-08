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
        <form onSubmit={handleFilter}>
          <select name="filter" onChange={(event) => onChangeFilter(event)}>
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
          <button type="submit">Filtrer</button>
        </form>
        <button onClick={() => listAll()}>Tout lister</button>
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
                  <th className="table-header-cell">#</th>
                  <th className="table-header-cell">
                    Désignation d'unité d'enseignement
                  </th>
                  <th className="table-header-cell">Crédit</th>
                  <th className="table-header-cell">Semestre de l'UE</th>
                </tr>
              </thead>
              <tbody>
                {annee_ue_matiere.ue_matieres.map(
                  (unite_enseignement, index) => (
                    <Fragment key={index}>
                      <tr key={index} className="table-row">
                        <td className="table-row-cell text-center">
                          {unite_enseignement.id_ue}
                        </td>
                        <td className="table-row-cell">
                          {unite_enseignement.designation_ue}
                        </td>
                        <td className="table-row-cell">
                          {unite_enseignement.credit}
                        </td>
                        <td className="table-row-cell">
                          S{unite_enseignement.semestre_ue}
                        </td>
                      </tr>
                      <tr className="h-[40px] bg-gray-300">
                        <th colSpan={4} className="text-center">
                          Matières contenant dans l'UE
                        </th>
                      </tr>
                      <tr>
                        <th>Code matière</th>
                        <th>Désignation matière</th>
                        <th>Coefficient</th>
                        <th>Volume horaire de la matière</th>
                      </tr>
                      {unite_enseignement.matieres.map((matiere, index) => (
                        <tr key={index}>
                          <td>{matiere.code_matiere}</td>
                          <td>{matiere.designation_matiere}</td>
                          <td>{matiere.coeff}</td>
                          <td>{matiere.v_horaire_matiere}</td>
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

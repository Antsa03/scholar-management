import Information from "@/models/information/Information";
import Niveau from "@/models/pedagogie/Niveau";
import React from "react";
import Link from "next/link";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Eye, EyeOff } from "react-feather";

interface InformationFormProps {
  isUpdate: boolean;
  id_obs: string;
  niveaux: Niveau[];
  information: Information;
  handleInputChange: Function;
  etudiants: Etudiant[];
  showAllEtudiants: boolean;
  suggestions_etudiants: Etudiant[];
  setNum_matricule: Function;
  handleShowAllEtudiants: Function;
  handleClickSuggestion_etudiant: Function;
  handleClickAllEtudiant: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function InformationForm({
  isUpdate,
  id_obs,
  niveaux,
  information,
  handleInputChange,
  etudiants,
  showAllEtudiants,
  suggestions_etudiants,
  setNum_matricule,
  handleShowAllEtudiants,
  handleClickSuggestion_etudiant,
  handleClickAllEtudiant,
  handleSubmit,
}: InformationFormProps) {
  return (
    <div>
      <h2 className="h2 font-poppins-regular mb-2">Formulaire information</h2>
      <form onSubmit={handleSubmit} className="container-col-div-input">
        {!isUpdate && (
          <div className="container-input">
            <label htmlFor="id_information" className="label">
              ID information
            </label>
            <input
              type="text"
              name="id_information"
              value={information.id_information || ""}
              onChange={(event) => handleInputChange(event)}
              className="input-form"
            />
          </div>
        )}
        <div className="container-input">
          <label htmlFor="num_matricule" className="label">
            N° matricule
          </label>
          <input
            type="text"
            name="num_matricule"
            value={information.num_matricule || ""}
            onChange={(event) => setNum_matricule(event)}
            className="input-form"
          />
          <div
            onClick={() => handleShowAllEtudiants()}
            className="place-suggestion"
          >
            {showAllEtudiants ? (
              <p className="p-show-all">
                {" "}
                <EyeOff size={14} />
                Cacher les suggestions
              </p>
            ) : (
              <p className="p-show-all">
                {" "}
                <Eye size={14} />
                Montrer les suggestions
              </p>
            )}
          </div>
          {showAllEtudiants && (
            <ul className="ul-show-all">
              {etudiants.map((etudiant, index) => (
                <li
                  key={index}
                  onClick={() => handleClickAllEtudiant(etudiant.num_matricule)}
                >
                  {etudiant.num_matricule +
                    ": " +
                    etudiant.nom +
                    " " +
                    etudiant.prenoms}
                </li>
              ))}
            </ul>
          )}
          {!showAllEtudiants &&
            suggestions_etudiants &&
            suggestions_etudiants.length > 0 && (
              <ul>
                {suggestions_etudiants.map((etudiant, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleClickSuggestion_etudiant(etudiant.num_matricule)
                    }
                  >
                    {etudiant.num_matricule +
                      ": " +
                      etudiant.nom +
                      " " +
                      etudiant.prenoms}
                  </li>
                ))}
              </ul>
            )}
        </div>
        <div className="container-input">
          <label htmlFor="annee_universitaire_5" className="label">
            Année universitaire
          </label>
          <input
            type="text"
            name="annee_universitaire_5"
            value={information.annee_universitaire_5 || ""}
            onChange={(event) => handleInputChange(event)}
            placeholder="AAAA - AAAA"
            className="input-form"
          />
        </div>

        <div className="container-input">
          <label htmlFor="groupe" className="label">
            Groupe
          </label>
          <input
            type="text"
            name="groupe"
            value={information.groupe || ""}
            onChange={(event) => handleInputChange(event)}
            className="input-form"
          />
        </div>
        <div className="container-input">
          <label htmlFor="id_niveau" className="label">
            Niveau
          </label>
          <input
            type="text"
            name="id_obs"
            value={(information.id_obs = id_obs || "")}
            onChange={(event) => handleInputChange(event)}
            hidden
          />
          <select
            name="id_niveau"
            value={information.id_niveau || ""}
            onChange={(event) => handleInputChange(event)}
            className="select-form"
          >
            <option value="">Sélectionnez un niveau</option>
            {niveaux.map((niveau, index) => (
              <option key={index} value={niveau.id_niveau}>
                {niveau.id_niveau + ": " + niveau.designation_niveau}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex flex-row justify-between mt-3">
          <button
            type="submit"
            className="button-form-short flex flex-row gap-2 items-center self-end"
          >
            <FontAwesomeIcon
              className="text-gray-200"
              icon={faPlus}
              width={16}
              height={16}
            />{" "}
            Ajouter l'observation
          </button>
          <Link href={"/utilisateur/etudiant"} className="button-cancel-form">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default InformationForm;

import Absence from "@/models/absence/etudiant/Absence";
import React, { useState } from "react";
import Link from "next/link";
import Matiere from "@/models/enseignement/Matiere";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { Eye, EyeOff } from "react-feather";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import Calendrier_3 from "@/models/absence/etudiant/Calendrier_3";

interface AbsenceFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Absence>;
  matieres: Matiere[];
  suggestions_matieres: any[];
  showAllMatieres: boolean;
  handleClickShowAllMatieres: Function;
  handleClickSuggestion: Function;
  handleClickAllMatiere: Function;
  etudiants: Etudiant[];
  showAllEtudiants: boolean;
  suggestions_etudiants: Etudiant[];
  handleShowAllEtudiants: Function;
  handleClickSuggestion_etudiant: Function;
  handleClickAllEtudiant: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Absence>;
  trigger_calendrier_3_form: UseFormTrigger<Calendrier_3>;
}

function AbsenceForm({
  isUpdate,
  register,
  matieres,
  suggestions_matieres,
  showAllMatieres,
  handleClickShowAllMatieres,
  handleClickSuggestion,
  handleClickAllMatiere,
  etudiants,
  showAllEtudiants,
  suggestions_etudiants,
  handleShowAllEtudiants,
  handleClickSuggestion_etudiant,
  handleClickAllEtudiant,
  handleSubmit,
  errors,
  trigger_calendrier_3_form,
}: AbsenceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form
      onSubmit={async (event) => {
        setIsSubmitting(true);
        await handleSubmit(event);
        setIsSubmitting(false);
      }}
      className="flex flex-col items-start gap-5 w-fit"
    >
      <div className="container-col-div-input">
        <div className="container-row-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_absence" className="label">
                ID absence *
              </label>
              <input
                type="text"
                {...register("id_absence", {
                  required: "L' id absence est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_absence?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              {errors?.id_absence && (
                <p className="p-error">{errors.id_absence.message}</p>
              )}
            </div>
          )}

          <div className="container-input">
            <label htmlFor="date_fin_abs" className="label">
              Date <p className="text-sm inline">(fin d'absence)</p> *
            </label>
            <input
              type="date"
              {...register("date_fin_abs", {
                required: "La date fin est obligatoire",
              })}
              className={`input-form ${
                errors?.date_fin_abs?.message ? "hasError" : ""
              }`}
            />
            {errors?.date_fin_abs && (
              <p className="p-error">{errors.date_fin_abs.message}</p>
            )}
          </div>
          <div className="container-input-heure">
            <label htmlFor="heure_fin_abs" className="label">
              Heure <p className="text-sm inline">(fin d'absence)</p> *
            </label>
            <input
              type="time"
              {...register("heure_fin_abs", {
                required: "L'heure fin est obligatoire",
              })}
              className={`input-form-heure ${
                errors?.heure_fin_abs?.message ? "hasError" : ""
              }`}
            />
            {errors?.heure_fin_abs && (
              <p className="p-error">{errors.heure_fin_abs.message}</p>
            )}
          </div>
        </div>
        <div className="container-row-div-input">
          <div className="container-select">
            <label htmlFor="type_absence" className="label">
              Type d'absence *
            </label>
            <select
              {...register("type_absence", {
                required: "Le type d'absence est obligatoire",
              })}
              className={`select-form ${
                errors?.type_absence?.message ? "hasError" : ""
              }`}
            >
              <option value="">Choisissez une valeur</option>
              <option value="Cours">Cours</option>
              <option value="Examen">Examen</option>
            </select>
            {errors?.type_absence && (
              <p className="p-error">{errors.type_absence.message}</p>
            )}
          </div>
          <div className="container-select">
            <label htmlFor="justifiee" className="label">
              Justifiée *
            </label>
            <select
              {...register("justifiee", {
                required: "La justification est obligatoire",
              })}
              className={`select-form ${
                errors?.justifiee?.message ? "hasError" : ""
              }`}
            >
              <option value="">Choisissez une valeur</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
            {errors?.justifiee && (
              <p className="p-error">{errors.justifiee.message}</p>
            )}
          </div>
        </div>
        <div className="container-row-div-input">
          <div className="container-input">
            <label htmlFor="num_matricule" className="label">
              N° matricule *
            </label>
            <input
              type="text"
              {...register("num_matricule", {
                required: "Le numéro matricule est obligatoire",
              })}
              className={`input-form ${
                errors?.num_matricule?.message ? "hasError" : ""
              }`}
              maxLength={50}
            />
            {errors?.num_matricule && (
              <p className="p-error">{errors.num_matricule.message}</p>
            )}
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
                    onClick={() =>
                      handleClickAllEtudiant(etudiant.num_matricule)
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
            <label htmlFor="code_matiere" className="label">
              Code matière *
            </label>
            <input
              type="text"
              {...register("code_matiere", {
                required: "Le code matière est obligatoire",
              })}
              className={`input-form ${
                errors?.code_matiere?.message ? "hasError" : ""
              }`}
              maxLength={10}
            />
            {errors?.code_matiere && (
              <p className="p-error">{errors.code_matiere.message}</p>
            )}
            <div
              onClick={() => handleClickShowAllMatieres()}
              className="place-suggestion"
            >
              {showAllMatieres ? (
                <p className="p-show-all">
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
            {showAllMatieres && (
              <ul className="ul-show-all">
                {matieres.map((matiere, index) => (
                  <li
                    key={index}
                    onClick={() => handleClickAllMatiere(matiere.code_matiere)}
                  >
                    {matiere.code_matiere + ": " + matiere.designation_matiere}
                  </li>
                ))}
              </ul>
            )}
            {!showAllMatieres &&
              suggestions_matieres &&
              suggestions_matieres.length > 0 && (
                <ul>
                  {suggestions_matieres.map((matiere, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleClickSuggestion(matiere.code_matiere)
                      }
                    >
                      {matiere.code_matiere +
                        ": " +
                        matiere.designation_matiere}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-12">
        <button
          type="submit"
          className="button-form-short flex flex-row gap-2 items-center self-end ml-auto"
          onClick={() => trigger_calendrier_3_form()}
        >
          {" "}
          {isSubmitting ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <FontAwesomeIcon
              className="text-gray-200"
              icon={faPlus}
              width={16}
              height={16}
            />
          )}
          {`${isUpdate ? "Valider les modifications" : "Ajouter l'absence"}`}
        </button>
        <button className="button-cancel-form">
          <Link href="/absence/etudiant">Annuler</Link>
        </button>
      </div>
    </form>
  );
}

export default AbsenceForm;

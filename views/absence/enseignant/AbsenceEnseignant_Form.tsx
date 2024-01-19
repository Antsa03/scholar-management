import Absence_enseignant from "@/models/absence/enseignant/Absence_enseignant";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Matiere from "@/models/enseignement/Matiere";
import { Eye, EyeOff } from "react-feather";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";
import Calendrier_4 from "@/models/absence/enseignant/Calendrier_4";

interface AbsenceEnseignant_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Absence_enseignant>;
  matieres: Matiere[];
  handleClickShowAllMatieres: Function;
  showAllMatieres: boolean;
  handleClickSuggestion: Function;
  handleClickAllMatiere: Function;
  suggestions: any[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Absence_enseignant>;
  trigger_calendrier_4_form: UseFormTrigger<Calendrier_4>;
}

function AbsenceEnseignant_Form({
  isUpdate,
  register,
  matieres,
  handleClickShowAllMatieres,
  showAllMatieres,
  handleClickAllMatiere,
  handleClickSuggestion,
  suggestions,
  handleSubmit,
  errors,
  trigger_calendrier_4_form,
}: AbsenceEnseignant_FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form
      onSubmit={async (event) => {
        setIsSubmitting(true);
        await handleSubmit(event);
        setIsSubmitting(false);
      }}
      className="flex flex-col justify-start gap-5 w-fit"
    >
      <div className="container-col-div-input">
        <div className="container-row-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_absence_ens" className="label">
                ID absence enseignant *
              </label>
              <input
                type="text"
                {...register("id_absence_ens", {
                  required: "L'id absence enseignant est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_absence_ens?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              {errors?.id_absence_ens && (
                <p className="p-error">{errors.id_absence_ens.message}</p>
              )}
            </div>
          )}

          <div className="container-input">
            <label htmlFor="date_fin_abs_ens" className="label">
              Date <p className="text-sm inline">(fin d'absence)</p> *
            </label>
            <input
              type="date"
              {...register("date_fin_abs_ens", {
                required: "La date fin d'absence est obligatoire",
              })}
              className={`input-form ${
                errors?.date_fin_abs_ens?.message ? "hasError" : ""
              }`}
            />
            {errors?.date_fin_abs_ens && (
              <p className="p-error">{errors.date_fin_abs_ens.message}</p>
            )}
          </div>
          <div className="container-input-heure">
            <label htmlFor="heure_fin_abs_ens" className="label">
              Heure <p className="text-sm inline">(fin d'absence)</p> *
            </label>
            <input
              type="time"
              {...register("heure_fin_abs_ens", {
                required: "L'heure fin  est obligatoire",
              })}
              className={`input-form-heure ${
                errors?.heure_fin_abs_ens?.message ? "hasError" : ""
              }`}
            />
            {errors?.heure_fin_abs_ens && (
              <p className="p-error">{errors.heure_fin_abs_ens.message}</p>
            )}
          </div>
        </div>

        <div className="container-row-div-input">
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
            {!showAllMatieres && suggestions && suggestions.length > 0 && (
              <ul>
                {suggestions.map((matiere, index) => (
                  <li
                    key={index}
                    onClick={() => handleClickSuggestion(matiere.code_matiere)}
                  >
                    {matiere.code_matiere + ": " + matiere.designation_matiere}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="container-select">
            <label htmlFor="justifiee_ens" className="label">
              Justifiée *
            </label>
            <select
              {...register("justifiee_ens", {
                required: "La justification est obligatoire",
              })}
              className={`select-form ${
                errors?.justifiee_ens?.message ? "hasError" : ""
              }`}
            >
              <option value="">Sélectionnez une valeur</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
            {errors?.justifiee_ens && (
              <p className="p-error">{errors.justifiee_ens.message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="button-form-short flex flex-row gap-2 items-center"
        onClick={() => trigger_calendrier_4_form()}
      >
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
    </form>
  );
}

export default AbsenceEnseignant_Form;

import Enseignant from "@/models/utilisateur/Enseignant";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import {
  faChalkboardTeacher,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";

interface EnseignantFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Enseignant>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Enseignant>;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function EnseignantForm({
  register,
  handleSubmit,
  isUpdate,
  errors,
  trigger_utilisateur_form,
}: EnseignantFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form
      onSubmit={async (event) => {
        setIsSubmitting(true);
        await handleSubmit(event);
        setIsSubmitting(false);
      }}
      className="flex flex-col"
    >
      <div className="flex flex-col  px-12 pt-4 pb-6 bg-white/70 border-2 mb-6 border-transparent  rounded-custom shadow-custom w-fit">
        <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            fontSize={16}
            className="text-gray-700 "
          />
          Enseignant
        </h2>
        <hr className="border-t-1 border-dotted border-black mb-[36px]" />
        <div className="container-col-div-input mb-5">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_enseignant" className="label">
                Id enseignant *
              </label>
              <input
                type="text"
                {...register("id_enseignant", {
                  required: "l'Id enseigant est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_enseignant?.message ? "hasError" : ""
                }`}
              />
              <p className="p-error">{errors?.id_enseignant?.message}</p>
            </div>
          )}
          <div className="container-input">
            <label htmlFor="diplome" className="label">
              Diplôme *
            </label>
            <input
              type="text"
              {...register("diplome", {
                required: "Le diplôme est obligatoire",
              })}
              className={`input-form ${
                errors?.diplome?.message ? "hasError" : ""
              }`}
              maxLength={30}
            />
            <p className="p-error">{errors?.diplome?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="grade" className="label">
              Grade *
            </label>
            <input
              type="text"
              {...register("grade", {
                required: "Le grade est obligatoire",
              })}
              className={`input-form ${
                errors?.grade?.message ? "hasError" : ""
              }`}
            />
            <p className="p-error">{errors?.grade?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="specialite" className="label">
              Spécialité *
            </label>
            <input
              type="text"
              {...register("specialite", {
                required: "La spécialité est obligatoire",
              })}
              className={`input-form ${
                errors?.specialite?.message ? "hasError" : ""
              }`}
            />
            <p className="p-error">{errors?.specialite?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="date_recrutement" className="label">
              Date de recrutement *
            </label>
            <input
              type="date"
              {...register("date_recrutement", {
                required: "La date de recrutement est obligatoire",
              })}
              className={`input-form ${
                errors?.date_recrutement?.message ? "hasError" : ""
              }`}
            />
            <p className="p-error">{errors?.date_recrutement?.message}</p>
          </div>
        </div>
        <div className="container-input">
          <label htmlFor="date_arret_ens" className="label">
            Date d'arrêt d'enseignement
          </label>
          <input
            type="date"
            {...register("date_arret_ens")}
            className={`input-form ${
              errors?.date_arret_ens?.message ? "hasError" : ""
            }`}
          />
          <p className="p-error">{errors?.date_arret_ens?.message}</p>
        </div>
      </div>
      <button
        type="submit"
        className="button-form-short flex flex-row gap-2 items-center self-end "
        onClick={() => trigger_utilisateur_form()}
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
        {`${isUpdate ? "Valider les modifications" : "Ajouter l'enseignant"}`}
      </button>
    </form>
  );
}

export default EnseignantForm;

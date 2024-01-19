import Etudiant from "@/models/utilisateur/Etudiant";
import {
  faGraduationCap,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Utilisateur } from "@prisma/client";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";

interface EtudiantFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Etudiant>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Etudiant>;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function EtudiantForm({
  isUpdate,
  register,
  handleSubmit,
  errors,
  trigger_utilisateur_form,
}: EtudiantFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form
      onSubmit={async (event) => {
        setIsSubmitting(true);
        await handleSubmit(event);
        setIsSubmitting(false);
      }}
    >
      <div className="flex flex-col px-12 pt-4 pb-6 bg-white/70 border-2  mb-6 border-transparent  rounded-custom shadow-custom w-fit">
        <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faGraduationCap}
            fontSize={16}
            className="text-gray-700 "
          />
          Etudiant
        </h2>
        <hr className="border-t-1 border-dotted border-black mb-[36px]" />

        <div className="container-col-div-input">
          {!isUpdate && (
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
              <p className="p-error">{errors?.num_matricule?.message}</p>
            </div>
          )}
          <div className="container-input">
            <label htmlFor="date_naissance" className="label">
              Date de naissance *
            </label>
            <input
              type="date"
              {...register("date_naissance", {
                required: "La date de naissance est obligatoire",
              })}
              className={`input-form ${
                errors?.num_matricule?.message ? "hasError" : ""
              }`}
            />
            <p className="p-error">{errors?.date_naissance?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="lieu_naissance " className="label">
              Lieu de naissance *
            </label>
            <input
              type="texte"
              {...register("lieu_naissance", {
                required: "La date de naissance est obligatoire",
              })}
              className={`input-form ${
                errors?.lieu_naissance?.message ? "hasError" : ""
              }`}
              maxLength={40}
            />
            <p className="p-error">{errors?.lieu_naissance?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="nationalite" className="label">
              Nationalité *
            </label>
            <input
              type="text"
              {...register("nationalite", {
                required: "La nationalité est obligatoire",
              })}
              className={`input-form ${
                errors?.nationalite?.message ? "hasError" : ""
              }`}
              maxLength={15}
            />
            <p className="p-error">{errors?.nationalite?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="civite" className="label">
              Civilité *
            </label>
            <select
              {...register("civilite", {
                required: "La civilité est obligatoire",
              })}
              className={`select-form ${
                errors?.civilite?.message ? "hasError" : ""
              }`}
            >
              <option value="">Sélectionner la civilité</option>
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
              <option value="Mademoiselle">Mademoiselle</option>
            </select>
            <p className="p-error">{errors?.civilite?.message}</p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="button-form-short flex flex-row gap-2 items-center self-end ml-auto"
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
        {`${isUpdate ? "Valider les modifications" : "Ajouter l'étudiant"}`}
      </button>
    </form>
  );
}

export default EtudiantForm;

import Matiere from "@/models/enseignement/Matiere";
import Enseignant from "@/models/utilisateur/listage/Enseignant";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import Link from "next/link";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface MatiereFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Matiere>;
  enseignants: Enseignant[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Matiere>;
}

function MatiereForm({
  isUpdate,
  register,
  enseignants,
  handleSubmit,
  errors,
}: MatiereFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire de matière
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout de matière</h2>
      ) : (
        <h2 className="h2">Modification de matière</h2>
      )}
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await handleSubmit(event);
          setIsSubmitting(false);
        }}
        className="flex flex-col gap-3 w-fit"
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-12  w-fit">
            <div className="container-col-div-input">
              {!isUpdate && (
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
                </div>
              )}
              <div className="container-input">
                <label htmlFor="coeff" className="label">
                  Coefficient *
                </label>
                <input
                  type="text"
                  {...register("coeff", {
                    required: "Le coefficient est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.coeff?.message ? "hasError" : ""
                  }`}
                />
                {errors?.coeff && (
                  <p className="p-error">{errors.coeff.message}</p>
                )}
              </div>
            </div>

            <div className="container-col-div-input">
              <div className="container-input">
                <label htmlFor="designation_matiere" className="label">
                  Désignation matière *
                </label>
                <input
                  type="text"
                  {...register("designation_matiere", {
                    required: "La désignation matière est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.designation_matiere?.message ? "hasError" : ""
                  }`}
                />
                {errors?.designation_matiere && (
                  <p className="p-error">
                    {errors.designation_matiere.message}
                  </p>
                )}
              </div>
              <div className="container-input">
                <label htmlFor="credit_matiere" className="label">
                  Crédit de la matière *
                </label>
                <input
                  type="text"
                  {...register("credit_matiere", {
                    required: "Le crédit de la matière est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.credit_matiere?.message ? "hasError" : ""
                  }`}
                />
                {errors?.credit_matiere && (
                  <p className="p-error">{errors.credit_matiere.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="container-col-div-input">
              <div className="container-input">
                <label htmlFor="v_horaire_matiere" className="label">
                  Volume horaire *
                </label>
                <input
                  type="number"
                  {...register("v_horaire_matiere", {
                    required: "Le volume horaire est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.v_horaire_matiere?.message ? "hasError" : ""
                  }`}
                />
                {errors?.v_horaire_matiere && (
                  <p className="p-error">{errors.v_horaire_matiere.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="container-text-area">
            <label htmlFor="description" className="label">
              Description *
            </label>
            <textarea
              {...register("description", {
                required: "La description est obligatoire",
              })}
              cols={50}
              rows={10}
              className={`text-area-form ${
                errors?.v_horaire_matiere?.message ? "hasError" : ""
              }`}
            ></textarea>
            {errors?.description && (
              <p className="p-error">{errors.description.message}</p>
            )}
          </div>

          <div className="container-select">
            <label htmlFor="id_enseignant" className="label">
              ID enseignant *
            </label>
            <select
              {...register("id_enseignant", {
                required: "L'id enseignant est obligatoire",
              })}
              className={`select-form ${
                errors?.id_enseignant?.message ? "hasError" : ""
              }`}
            >
              <option value="">Séléctionner un ID enseignant </option>
              {enseignants.map((enseignant, index) => (
                <option value={enseignant.id_enseignant} key={index}>
                  {enseignant.id_enseignant +
                    ": " +
                    enseignant.nom +
                    " " +
                    enseignant.prenoms}
                </option>
              ))}
            </select>
            {errors?.id_enseignant && (
              <p className="p-error">{errors.id_enseignant.message}</p>
            )}
          </div>
          <div className="flex flex-row gap-12 w-fit mt-4 justify-between">
            <button
              type="submit"
              className="button-form-short flex flex-row gap-2 items-center"
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
              {`${
                isUpdate ? "Valider les modifications" : "Ajouter la matière"
              }`}
            </button>
            <Link href={"/matiere"} className="button-cancel-form">
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MatiereForm;

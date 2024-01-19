import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import Link from "next/link";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type UEFormProps = {
  isUpdate: boolean;
  register: UseFormRegister<Unite_enseignement>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Unite_enseignement>;
};

function UEForm({ isUpdate, register, handleSubmit, errors }: UEFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire d'unité d'enseignement
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout d'unité d'enseignement</h2>
      ) : (
        <h2 className="h2">Modification d'unité d'enseignement</h2>
      )}
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await handleSubmit(event);
          setIsSubmitting(false);
        }}
        className="flex flex-col w-fit gap-1"
      >
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_ue" className="label">
                ID unité d'enseignement *
              </label>
              <input
                type="text"
                {...register("id_ue", { required: "L'id ue est obligatoire" })}
                className={`input-form ${
                  errors?.id_ue?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              {errors?.id_ue && (
                <p className="p-error">{errors.id_ue.message}</p>
              )}
            </div>
          )}
          <div className="container-input">
            {" "}
            <label htmlFor="designation_ue" className="label">
              Désignation d'unité d'enseignement *
            </label>
            <input
              type="text"
              {...register("designation_ue", {
                required: "La désignation est obligatoire",
              })}
              className={`input-form ${
                errors?.designation_ue?.message ? "hasError" : ""
              }`}
              maxLength={100}
            />
            {errors?.designation_ue && (
              <p className="p-error">{errors.designation_ue.message}</p>
            )}
          </div>

          <div className="container-input">
            <label htmlFor="crédit" className="label">
              Crédit *
            </label>
            <input
              type="text"
              {...register("credit", { required: "Le crédit est obligatoire" })}
              className={`input-form ${
                errors?.credit?.message ? "hasError" : ""
              }`}
            />
            {errors?.credit && (
              <p className="p-error">{errors.credit.message}</p>
            )}
          </div>

          <div className="container-input">
            {" "}
            <label htmlFor="semestre_ue" className="label">
              Semestre de l'unité d'enseignement *
            </label>
            <input
              type="text"
              {...register("semestre_ue", {
                required: "La semestre de l'UE est obligatoire",
              })}
              className={`input-form ${
                errors?.semestre_ue?.message ? "hasError" : ""
              }`}
              maxLength={3}
            />
            {errors?.semestre_ue && (
              <p className="p-error">{errors.semestre_ue.message}</p>
            )}
          </div>

          <div className="container-text-area gap-2">
            <label htmlFor="description_ue">Description de l'UE *</label>
            <textarea
              {...register("description_ue", {
                required:
                  "Description de l'unité d'enseignement est obligatoire",
              })}
              cols={50}
              rows={10}
              className={`text-area-form ${
                errors?.description_ue?.message ? "hasError" : ""
              }`}
            ></textarea>
            {errors?.description_ue && (
              <p className="p-error">{errors.description_ue.message}</p>
            )}
          </div>

          <div className="flex flex-row justify-between mt-2">
            <button
              type="submit"
              className="button-form-short flex flex-row gap-2 items-center self-end"
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
              {`${isUpdate ? "Valider les modifications" : "Ajouter l'UE"}`}
            </button>
            <Link href={"/unite_enseignement"} className="button-cancel-form">
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UEForm;

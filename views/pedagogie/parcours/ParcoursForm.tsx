import Parcours from "@/models/pedagogie/Parcours";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import Link from "next/link";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ParcoursFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Parcours>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Parcours>;
}

function ParcoursForm({
  isUpdate,
  register,
  handleSubmit,
  errors,
}: ParcoursFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <h1 className="h1 flex flex-row items-center gap-2 mb-5">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire d'ajout de parcours
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout de parcours</h2>
      ) : (
        <h2>Modification de parcours</h2>
      )}
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await handleSubmit(event);
          setIsSubmitting(false);
        }}
        className="flex flex-col w-fit mt-4"
      >
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_parcours" className="label">
                ID parcours *
              </label>
              <input
                type="text"
                {...register("id_parcours", {
                  required: "L'id parcours est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_parcours?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              {errors?.id_parcours && (
                <p className="p-error">{errors.id_parcours.message}</p>
              )}
            </div>
          )}
          <div className="container-input">
            <label htmlFor="designation_parcours" className="label">
              Désignation parcours *
            </label>
            <input
              type="text"
              {...register("designation_parcours", {
                required: "La désignation du parcours est obligatoire",
              })}
              className={`input-form ${
                errors?.designation_parcours?.message ? "hasError" : ""
              }`}
            />
            {errors?.designation_parcours && (
              <p className="p-error">{errors.designation_parcours.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <button
            type="submit"
            className="button-form-short flex flex-row gap-2 items-center self-start"
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
            {`${isUpdate ? "Valider les modifications" : "Ajouter parcours"}`}
          </button>
          <Link href={"/pedagogie"} className="button-cancel-form">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ParcoursForm;

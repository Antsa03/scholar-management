import Niveau from "@/models/pedagogie/Niveau";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import Link from "next/link";
import React, { useState } from "react";
import { ChevronsRight } from "react-feather";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface NiveauFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Niveau>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Niveau>;
}

function NiveauForm({
  isUpdate,
  register,
  handleSubmit,
  errors,
}: NiveauFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <h1 className="h1 flex flex-row items-center gap-2 mb-5">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire de niveau
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout de niveau</h2>
      ) : (
        <h2 className="h2">Modification de niveau</h2>
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
              <label htmlFor="id_niveau" className="label">
                ID niveau *
              </label>
              <input
                type="text"
                {...register("id_niveau", {
                  required: "L'id niveau est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_niveau?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              {errors?.id_niveau && (
                <p className="p-error">{errors.id_niveau.message}</p>
              )}
            </div>
          )}
          <div className="container-input">
            <label htmlFor="designation_niveau" className="label">
              Désignation du niveau *
            </label>
            <input
              type="text"
              {...register("designation_niveau", {
                required: "La désignation est obligatoire",
              })}
              className={`input-form ${
                errors?.designation_niveau?.message ? "hasError" : ""
              }`}
              maxLength={15}
            />
            {errors?.designation_niveau && (
              <p className="p-error">{errors.designation_niveau.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <button
            type="submit"
            className="button-form-short flex flex-row gap-2 items-center self-start"
            disabled={isSubmitting}
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
            {`${isUpdate ? "Valider les modifications" : "Ajouter niveau"}`}
          </button>

          <Link href={"/pedagogie"} className="button-cancel-form block">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NiveauForm;

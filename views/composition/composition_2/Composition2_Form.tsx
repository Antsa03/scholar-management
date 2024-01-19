import Composer_2 from "@/models/composition/Composer_2";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import Parcours from "@/models/pedagogie/Parcours";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronsRight } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

interface Composition2_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Composer_2>;
  parcours: Parcours[];
  unite_enseignements: Unite_enseignement[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Composer_2>;
}

function Composition2_Form({
  isUpdate,
  register,
  parcours,
  unite_enseignements,
  handleSubmit,
  errors,
}: Composition2_FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire de Composition 2 (relation entre UE et parcours)
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout de composition 2</h2>
      ) : (
        <h2 className="h2">Modification de composition 2</h2>
      )}
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await handleSubmit(event);
          setIsSubmitting(false);
        }}
        className="flex flex-col w-fit"
      >
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_composer_2" className="label">
                ID composer_2 *
              </label>
              <input
                type="text"
                {...register("id_composer_2", {
                  required: "L'id composer_2 est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_composer_2?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              {errors?.id_composer_2 && (
                <p className="p-error">{errors.id_composer_2.message}</p>
              )}
            </div>
          )}
          <div className="container-select">
            {" "}
            <label htmlFor="id_parcours" className="label">
              ID parcours *
            </label>
            <select
              {...register("id_parcours", {
                required: "L'id parcours est obligatoire",
              })}
              className={`select-form ${
                errors?.id_ue?.message ? "hasError" : ""
              }`}
            >
              <option value="">Sélectionnez un parcours</option>
              {parcours.map((parcours, index) => (
                <option key={index} value={parcours.id_parcours}>
                  {parcours.id_parcours + ": " + parcours.designation_parcours}
                </option>
              ))}
            </select>
            {errors?.id_parcours && (
              <p className="p-error">{errors.id_parcours.message}</p>
            )}
          </div>

          <div className="container-select">
            {" "}
            <label htmlFor="id_ue" className="label">
              ID unité d'enseignement *
            </label>
            <select
              {...register("id_ue", { required: "L'id ue est obligatoire" })}
              className={`select-form ${
                errors?.id_ue?.message ? "hasError" : ""
              }`}
            >
              <option value="">Sélectionnez un unité d'enseignement</option>
              {unite_enseignements.map((unite_enseignement, index) => (
                <option key={index} value={unite_enseignement.id_ue}>
                  {unite_enseignement.id_ue +
                    ": " +
                    unite_enseignement.designation_ue}
                </option>
              ))}
            </select>
            {errors?.id_ue && <p className="p-error">{errors.id_ue.message}</p>}
          </div>
        </div>

        <div className="flex flex-row justify-between mt-4">
          {" "}
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
              isUpdate ? "Valider les modifications" : "Ajouter la composition"
            }`}
          </button>
          <Link
            href={"/composition/composition_2"}
            className="button-cancel-form"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Composition2_Form;

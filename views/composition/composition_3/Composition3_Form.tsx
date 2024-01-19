import Composer_3 from "@/models/composition/Composer_3";
import Niveau from "@/models/pedagogie/Niveau";
import Parcours from "@/models/pedagogie/Parcours";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronsRight } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { add } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

interface Composition3_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Composer_3>;
  niveaux: Niveau[];
  parcours: Parcours[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Composer_3>;
}

function Composition3_Form({
  isUpdate,
  register,
  niveaux,
  parcours,
  handleSubmit,
  errors,
}: Composition3_FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire de Composition 3 (relation entre parcours et niveau)
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout de composition 3</h2>
      ) : (
        <h2 className="h2">Modification de composition 3</h2>
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
              <label htmlFor="id_composer_3" className="label">
                ID composition 3 *
              </label>
              <input
                type="text"
                {...register("id_composer_3", {
                  required: "L'id composer_3 est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_composer_3?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              {errors?.id_composer_3 && (
                <p className="p-error">{errors.id_composer_3.message}</p>
              )}
            </div>
          )}
          <div className="container-input">
            <label htmlFor="id_parcours" className="label">
              ID parcours *
            </label>
            <select
              {...register("id_parcours", {
                required: "L'id parcours est obligatoire",
              })}
              className={`select-form ${
                errors?.id_parcours?.message ? "hasError" : ""
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

          <div className="container-input">
            <label htmlFor="id_niveau" className="label">
              ID niveau *
            </label>
            <select
              {...register("id_niveau", {
                required: "L'id niveau est obligatoire",
              })}
              className={`select-form ${
                errors?.id_niveau?.message ? "hasError" : ""
              }`}
            >
              <option value="">Sélectionnez un niveau</option>
              {niveaux.map((niveau, index) => (
                <option key={index} value={niveau.id_niveau}>
                  {niveau.id_niveau + ": " + niveau.designation_niveau}
                </option>
              ))}
            </select>{" "}
            {errors?.id_niveau && (
              <p className="p-error">{errors.id_niveau.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between mt-4">
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
            {`${
              isUpdate ? "Valider les modifications" : "Ajouter la composition"
            }`}
          </button>
          <button className="button-cancel-form">
            <Link href={"/composition/composition_3"}>Annuler</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Composition3_Form;

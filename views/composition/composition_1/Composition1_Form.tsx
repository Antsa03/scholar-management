import Composer_1 from "@/models/composition/Composer_1";
import Matiere from "@/models/enseignement/Matiere";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import Link from "next/link";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Composition1_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Composer_1>;
  matieres: Matiere[];
  unite_enseignements: Unite_enseignement[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Composer_1>;
}

function Composition1_Form({
  isUpdate,
  register,
  matieres,
  unite_enseignements,
  handleSubmit,
  errors,
}: Composition1_FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire pour la Composition 1 (relation entre Matière et unité
        d'enseignement)
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout de composition 1</h2>
      ) : (
        <h2 className="h2">Modification de composition 1</h2>
      )}
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await handleSubmit(event);
          setIsSubmitting(false);
        }}
        className="flex flex-col justify-start gap-4 w-fit"
      >
        <div className="container-col-div-input">
          <div className="container-row-div-input">
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_composer_1" className="label">
                  ID composer_1 *
                </label>
                <input
                  type="text"
                  {...register("id_composer_1", {
                    required: "L' id composer_1 est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.id_composer_1?.message ? "hasError" : ""
                  }`}
                  maxLength={10}
                />
                {errors?.id_composer_1 && (
                  <p className="p-error">{errors.id_composer_1.message}</p>
                )}
              </div>
            )}
            <div className="container-input">
              <label htmlFor="annee_universitaire" className="label">
                Année universitaire *
              </label>
              <input
                type="text"
                {...register("annee_universitaire_1", {
                  required: "L'année universitaire est obligatoire",
                })}
                placeholder="AAAA - AAAA"
                className={`input-form ${
                  errors?.annee_universitaire_1?.message ? "hasError" : ""
                }`}
                maxLength={11}
              />
              {errors?.annee_universitaire_1 && (
                <p className="p-error">
                  {errors.annee_universitaire_1.message}
                </p>
              )}
            </div>
          </div>
          <div className="container-row-div-input">
            <div className="container-input">
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
              {errors?.id_ue && (
                <p className="p-error">{errors.id_ue.message}</p>
              )}
            </div>

            <div className="container-input">
              <label htmlFor="code_matiere" className="label">
                Code matière *
              </label>
              <select
                {...register("code_matiere", {
                  required: "Le code matière est obligatoire",
                })}
                className={`select-form ${
                  errors?.code_matiere?.message ? "hasError" : ""
                }`}
              >
                <option value="">Sélectionnez un matière</option>
                {matieres.map((matiere, index) => (
                  <option key={index} value={matiere.code_matiere}>
                    {matiere.code_matiere + ": " + matiere.designation_matiere}
                  </option>
                ))}
              </select>
              {errors?.code_matiere && (
                <p className="p-error">{errors.code_matiere.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8">
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
            href={"/composition/composition_1"}
            className="button-cancel-form"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Composition1_Form;

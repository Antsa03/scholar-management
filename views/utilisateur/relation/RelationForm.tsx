import Relation from "@/models/utilisateur/Relation";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import Responsable_legal from "@/models/utilisateur/listage/Responsable_legal";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSpinner,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

interface RelationFormProps {
  register: UseFormRegister<Relation>;
  responsable_legals: Responsable_legal[];
  etudiants: Etudiant[];
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isUpdate: boolean;
  errors: FieldErrors<Relation>;
}

function RelationForm({
  isUpdate,
  register,
  responsable_legals,
  etudiants,
  onSubmit,
  errors,
}: RelationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-col gap-4 relative ml-4 px-28">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        {`${
          isUpdate
            ? "Modification de relation parentale"
            : "Ajouter une relation parentale"
        }`}
      </h1>
      <p>
        L'ID relation permet d'identifier de manière unique la relation
        parentale.
      </p>
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await onSubmit(event);
          setIsSubmitting(false);
        }}
        className="px-12 py-6 bg-white/70 border-2 my-4 border-transparent  rounded-custom shadow-custom w-fit"
      >
        <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faUserShield}
            fontSize={16}
            className="text-gray-700 "
          />{" "}
          {`${
            isUpdate
              ? "Modifier la relation parentale"
              : "Ajouter une relation parentale"
          }`}
        </h2>
        <hr className="border-t-1 border-dotted border-black mb-[36px]" />
        <div className="container-col-div-input mb-5">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_relation" className="label">
                ID relation
              </label>
              <input
                type="text"
                {...register("id_relation", {
                  required: "L'id de la relation parentale est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_relation?.message ? "hasError" : ""
                }`}
              />
              <p className="p-error">{errors?.id_relation?.message}</p>
            </div>
          )}
          <div className="container-select">
            <label htmlFor="id_responsable_legal" className="label">
              ID responsable légale
            </label>
            <select
              {...register("id_responsable_legal", {
                required: "L'id responsable légale est obligatoire",
              })}
              className={`select-form ${
                errors?.id_responsable_legal?.message ? "hasError" : ""
              }`}
            >
              <option className="block" value="">
                Séléctionner un ID responsable légal
              </option>
              {responsable_legals.map((responsable_legal, index) => (
                <option
                  key={index}
                  value={responsable_legal.id_reponsable_legal}
                >
                  {responsable_legal.id_reponsable_legal +
                    ": " +
                    responsable_legal.nom +
                    " " +
                    responsable_legal.prenoms}
                </option>
              ))}
            </select>
            <p className="p-error">{errors?.id_responsable_legal?.message}</p>
          </div>
          <div className="container-select">
            <label htmlFor="num_matricule" className="label">
              N° matricule
            </label>
            <select
              {...register("num_matricule", {
                required: "Le numéro matricule est obligatoire",
              })}
              className={`select-form ${
                errors?.num_matricule?.message ? "hasError" : ""
              }`}
            >
              <option value="" className="bg-white">
                Sélectionnez N° matricule
              </option>
              {etudiants.map((etudiant, index) => (
                <option
                  key={index}
                  value={etudiant.num_matricule}
                  className="bg-white appearance-none"
                >
                  {etudiant.num_matricule +
                    ": " +
                    etudiant.nom +
                    " " +
                    etudiant.prenoms}
                </option>
              ))}
            </select>
            <p className="p-error">{errors?.num_matricule?.message}</p>
          </div>
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
            {`${isUpdate ? "Valider les modifications" : "Ajouter"}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RelationForm;

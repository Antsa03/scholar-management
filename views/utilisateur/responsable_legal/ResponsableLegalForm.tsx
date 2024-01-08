import Responsable_legal from "@/models/utilisateur/Responsable_legal";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import {
  faPlus,
  faSpinner,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";

interface ResponsableLegalFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Responsable_legal>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Responsable_legal>;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function ResponsableLegalForm({
  isUpdate,
  register,
  handleSubmit,
  errors,
  trigger_utilisateur_form,
}: ResponsableLegalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form
      onSubmit={async (event) => {
        setIsSubmitting(true);
        await handleSubmit(event);
        setIsSubmitting(false);
      }}
    >
      <div className="flex flex-col  px-12 pt-4 pb-6 bg-white/70 border-2 mb-6 border-transparent  rounded-custom shadow-custom w-fit">
        <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faUserTie}
            fontSize={16}
            className="text-gray-700 "
          />
          Responsable légale
        </h2>
        <hr className="border-t-1 border-dotted border-black mb-[36px]" />
        <div className="container-col-div-input">
          {!isUpdate && (
            <div className="container-input">
              <label htmlFor="id_responsable_legale" className="label">
                Id responsable
              </label>
              <input
                type="text"
                {...register("id_responsable_legal", {
                  required: "L'id responsable légale est obligatoire",
                })}
                className={`input-form ${
                  errors?.id_responsable_legal?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              <p className="p-error">{errors?.id_responsable_legal?.message}</p>
            </div>
          )}
          <div className="container-input">
            <label htmlFor="profession" className="label">
              Profession
            </label>
            <input
              type="text"
              {...register("profession", {
                required: "La profession est obligatoire",
              })}
              className={`input-form ${
                errors?.profession?.message ? "hasError" : ""
              }`}
              maxLength={50}
            />
            <p className="p-error">{errors?.profession?.message}</p>
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
        {isUpdate ? "Valider les modifications" : "Ajouter responsable légale"}
      </button>
    </form>
  );
}

export default ResponsableLegalForm;

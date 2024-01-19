import Admin from "@/models/utilisateur/Admin";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import {
  faPlus,
  faSpinner,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";

interface AdminFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Admin>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Admin>;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function AdminForm({
  isUpdate,
  register,
  handleSubmit,
  errors,
  trigger_utilisateur_form,
}: AdminFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await handleSubmit(event);
          setIsSubmitting(false);
        }}
        className="w-fit"
      >
        <div className="flex flex-col  px-12 pt-4 pb-6 bg-white/70 border-2  mb-6 border-transparent  rounded-custom shadow-custom w-fit">
          <h2 className="h2 mt-2 mb-6 flex flex-row items-center justify-center gap-3 ">
            <FontAwesomeIcon
              icon={faUserShield}
              fontSize={16}
              className="text-gray-700 "
            />
            Administrateur
          </h2>
          <hr className="border-t-1 border-dotted border-black mb-[36px]" />
          <div className="container-col-div-input">
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_admin" className="label">
                  Id administrateur *
                </label>
                <input
                  type="text"
                  {...register("id_admin", {
                    required: "L' Id administrateur est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.id_admin?.message ? "hasError" : ""
                  }`}
                />
                <p className="p-error">{errors?.id_admin?.message}</p>
              </div>
            )}
            <div className="container-input">
              <label htmlFor="fonction" className="label">
                Fonction de l'administrateur *
              </label>
              <input
                type="text"
                {...register("fonction", {
                  required: "La fonction de l'administrateur est obligatoire",
                })}
                className={`input-form ${
                  errors?.fonction?.message ? "hasError" : ""
                }`}
                maxLength={30}
              />
              <p className="p-error">{errors?.fonction?.message}</p>
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
          {`${
            isUpdate ? "Modifier l'administrateur" : "Ajouter l'administrateur"
          }`}
        </button>
      </form>
    </div>
  );
}

export default AdminForm;

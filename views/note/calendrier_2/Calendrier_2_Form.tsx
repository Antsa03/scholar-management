import Calendrier_2 from "@/models/note_1/Calendrier_2";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Calendrier2FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Calendrier_2>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Calendrier_2>;
}

function Calendrier_2_Form({
  isUpdate,
  register,
  handleSubmit,
  errors,
}: Calendrier2FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire de calendrier_2
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout de calendrier 2</h2>
      ) : (
        <h2 className="h2">Modification de calendrier 2</h2>
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
          <div className="container-row-div-input">
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_calendrier" className="label">
                  ID calendrier *
                </label>
                <input
                  type="text"
                  {...register("id_calendrier_2", {
                    required: "L'id_calendrier_2 est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.id_calendrier_2?.message ? "hasError" : ""
                  }`}
                  maxLength={10}
                />
                <p className="p-error">{errors?.id_calendrier_2?.message}</p>
              </div>
            )}
            <div className="container-input">
              <label htmlFor="annee_universitaire_2" className="label">
                Année universitaire *
              </label>
              <input
                type="text"
                {...register("annee_universitaire_2", {
                  required: "L'année universitaire est obligatoire",
                })}
                placeholder="AAAA - AAAA"
                className={`input-form ${
                  errors?.annee_universitaire_2?.message ? "hasError" : ""
                }`}
                maxLength={11}
              />
              <p className="p-error">
                {errors?.annee_universitaire_2?.message}
              </p>
            </div>
          </div>
          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="semestre" className="label">
                Semestre *
              </label>
              <input
                type="text"
                {...register("semestre", {
                  required: "Le semestre est obligatoire",
                })}
                className={`input-form ${
                  errors?.semestre?.message ? "hasError" : ""
                }`}
                maxLength={3}
              />
              <p className="p-error">{errors?.semestre?.message}</p>
            </div>
            <div className="container-input">
              <label htmlFor="session" className="label">
                Session *
              </label>
              <input
                type="text"
                {...register("session", {
                  required: "La session est obligatoire",
                })}
                className={`input-form ${
                  errors?.session?.message ? "hasError" : ""
                }`}
              />
              <p className="p-error">{errors?.session?.message}</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="button-form-short flex flex-row gap-2 items-center self-end ml-auto"
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
          {`${isUpdate ? "Valider les modifications" : "Ajouter calendrier_2"}`}
        </button>
      </form>
    </div>
  );
}

export default Calendrier_2_Form;

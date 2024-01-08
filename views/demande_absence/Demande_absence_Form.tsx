import Demande_absence from "@/models/demande_absence/Demande_absence";
import React, { useState } from "react";
import Link from "next/link";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ChevronsRight, Eye, EyeOff } from "react-feather";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

interface Demande_absence_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Demande_absence>;
  etudiants: Etudiant[];
  showAllEtudiants: boolean;
  suggestions_etudiants: Etudiant[];
  handleShowAllEtudiants: Function;
  handleClickSuggestion_etudiant: Function;
  handleClickAllEtudiant: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Demande_absence>;
}

function Demande_absence_Form({
  isUpdate,
  register,
  etudiants,
  showAllEtudiants,
  suggestions_etudiants,
  handleShowAllEtudiants,
  handleClickSuggestion_etudiant,
  handleClickAllEtudiant,
  handleSubmit,
  errors,
}: Demande_absence_FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire d'ajout d'unde démande d'absence
      </h1>
      <h2 className="h2">Ajouter d'une démande d'absence</h2>
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await handleSubmit(event);
          setIsSubmitting(false);
        }}
        className="flex flex-col w-fit gap-1"
      >
        <div className="container-col-div-input">
          <div className="container-row-div-input">
            {" "}
            {!isUpdate && (
              <div className="container-input">
                <label htmlFor="id_demande_absence" className="label">
                  ID demande d'absence
                </label>
                <input
                  type="text"
                  {...register("id_demande_absence", {
                    required: "L'id demande d'absence est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.id_demande_absence?.message ? "hasError" : ""
                  }`}
                  maxLength={10}
                />
                {errors?.id_demande_absence && (
                  <p className="p-error">{errors.id_demande_absence.message}</p>
                )}
              </div>
            )}
            <div className="flex flex-row gap-[8px] w-[340px]">
              <div className="container-input">
                <label htmlFor="num_matricule" className="label">
                  N° matricule
                </label>
                <input
                  type="text"
                  {...register("num_matricule", {
                    required: "Le numéro matricule est obligatoire",
                  })}
                  className={`input-form ${
                    errors?.num_matricule?.message ? "hasError" : ""
                  }`}
                  maxLength={50}
                />
                {errors?.num_matricule && (
                  <p className="p-error">{errors.num_matricule.message}</p>
                )}
                <div
                  onClick={() => handleShowAllEtudiants()}
                  className="place-suggestion"
                >
                  {showAllEtudiants ? (
                    <p className="p-show-all">
                      <EyeOff size={14} />
                      Cacher les suggestions
                    </p>
                  ) : (
                    <p className="p-show-all">
                      {" "}
                      <Eye size={14} />
                      Montrer les suggestions
                    </p>
                  )}
                </div>

                {showAllEtudiants && (
                  <ul className="ul-show-all">
                    {etudiants.map((etudiant, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleClickAllEtudiant(etudiant.num_matricule)
                        }
                      >
                        {etudiant.num_matricule +
                          ": " +
                          etudiant.nom +
                          " " +
                          etudiant.prenoms}
                      </li>
                    ))}
                  </ul>
                )}
                {!showAllEtudiants &&
                  suggestions_etudiants &&
                  suggestions_etudiants.length > 0 && (
                    <ul>
                      {suggestions_etudiants.map((etudiant, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleClickSuggestion_etudiant(
                              etudiant.num_matricule
                            )
                          }
                        >
                          {etudiant.num_matricule +
                            ": " +
                            etudiant.nom +
                            " " +
                            etudiant.prenoms}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          </div>
          <div className="container-row-div-input">
            {" "}
            <div className="container-input">
              <label htmlFor="date_demandee" className="label">
                Date demandée
              </label>
              <input
                type="date"
                {...register("date_demandee", {
                  required: "La date de demande est obligatoire",
                })}
                className={`input-form ${
                  errors?.date_demandee?.message ? "hasError" : ""
                }`}
              />
              {errors?.date_demandee && (
                <p className="p-error">{errors.date_demandee.message}</p>
              )}
            </div>
          </div>
          <div className="container-row-div-input">
            <div className="container-text-area">
              <label htmlFor="motif" className="label">
                Motif
              </label>
              <textarea
                {...register("motif", { required: "Le motif est obligatoire" })}
                cols={60}
                rows={3}
                className={`text-area-form ${
                  errors?.motif?.message ? "hasError" : ""
                }`}
                maxLength={60}
              ></textarea>
              {errors?.motif && (
                <p className="p-error">{errors.motif.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-12">
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
            {`${isUpdate ? "Valider les modifications" : "Ajouter l'absence"}`}
          </button>
          <Link href={"/demande_absence"} className="button-cancel-form">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Demande_absence_Form;

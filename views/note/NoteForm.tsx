import Matiere from "@/models/enseignement/Matiere";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import Noter_1 from "@/models/note_1/Noter_1";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import { Eye, EyeOff } from "react-feather";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

interface NoteFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Noter_1>;
  calendrier_2: Calendrier_2[];
  matieres: Matiere[];
  handleClickShowAllMatieres: Function;
  showAllMatieres: boolean;
  handleClickSuggestion_matiere: Function;
  handleClickAllMatiere: Function;
  suggestions_matieres: any[];
  etudiants: Etudiant[];
  showAllEtudiants: boolean;
  suggestions_etudiants: Etudiant[];
  handleShowAllEtudiants: Function;
  handleClickSuggestion_etudiant: Function;
  handleClickAllEtudiant: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<Noter_1>;
}

function NoteForm({
  isUpdate,
  calendrier_2,
  register,
  matieres,
  handleClickShowAllMatieres,
  showAllMatieres,
  handleClickSuggestion_matiere,
  handleClickAllMatiere,
  suggestions_matieres,
  etudiants,
  showAllEtudiants,
  suggestions_etudiants,
  handleShowAllEtudiants,
  handleClickSuggestion_etudiant,
  handleClickAllEtudiant,
  handleSubmit,
  errors,
}: NoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-col gap-4 w-full relative ml-4 px-28 ">
      <h1 className="h1 flex flex-row items-center gap-2 ">
        <IonIcon
          icon={add}
          className="-text--text-blue-color  ion-icon-title"
        ></IonIcon>
        Formulaire de note
      </h1>
      {!isUpdate ? (
        <h2 className="h2">Ajout de note d'étudiant</h2>
      ) : (
        <h2 className="h2">Modification de note d'étudiant</h2>
      )}
      <form
        onSubmit={async (event) => {
          setIsSubmitting(true);
          await handleSubmit(event);
          setIsSubmitting(false);
        }}
        className="flex flex-col gap-3 w-fit"
      >
        <div className="container-col-div-input">
          <div className="container-row-div-input">
            <div className="container-input">
              <label htmlFor="id_calendrier_2" className="label">
                ID calendrier_2 *
              </label>
              <select
                {...register("id_calendrier_2", {
                  required: "L'id_calendrier_2 est obligatoire",
                })}
                className={`select-form ${
                  errors?.id_calendrier_2?.message ? "hasError" : ""
                }`}
              >
                <option value="">Sélectionner un calendrier_2</option>
                {calendrier_2.map((calendrier_2, index) => (
                  <option key={index} value={calendrier_2.id_calendrier_2}>
                    {calendrier_2.id_calendrier_2 +
                      ": Année universitaire: " +
                      calendrier_2.annee_universitaire_2 +
                      " " +
                      "Semestre: " +
                      calendrier_2.semestre +
                      " / " +
                      "Session: " +
                      calendrier_2.session}
                  </option>
                ))}
              </select>
              <p className="p-error">{errors?.id_calendrier_2?.message}</p>
            </div>

            <div className="container-input">
              <label htmlFor="note_matiere" className="label">
                Note /20 *
              </label>
              <input
                type="text"
                {...register("note_matiere", {
                  required: "La note matière est obligatoire",
                  validate: (value) =>
                    parseFloat(value) <= 20 ||
                    "La note ne doit pas dépasser de 20",
                })}
                className={`input-form ${
                  errors?.note_matiere?.message ? "hasError" : ""
                }`}
              />
              <p className="p-error">{errors?.note_matiere?.message}</p>
            </div>
          </div>

          <div className="container-row-div-input">
            <div className="container-input  relative">
              <label htmlFor="num_matricule" className="label">
                N° matricule *
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
              <p className="p-error">{errors?.num_matricule?.message}</p>
              <div
                onClick={() => handleShowAllEtudiants()}
                className="place-suggestion"
              >
                {showAllEtudiants ? (
                  <p className="p-show-all">
                    {" "}
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
                  <ul className="ul-show-all">
                    {suggestions_etudiants.map((etudiant, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleClickSuggestion_etudiant(etudiant.num_matricule)
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

            <div className="container-input relative">
              <label htmlFor="code_matiere" className="label">
                Code matière *
              </label>
              <input
                type="text"
                {...register("code_matiere", {
                  required: "Le code matière est obligatoire",
                })}
                className={`input-form ${
                  errors?.code_matiere?.message ? "hasError" : ""
                }`}
                maxLength={10}
              />
              <p className="p-error">{errors?.code_matiere?.message}</p>
              <div
                onClick={() => handleClickShowAllMatieres()}
                className="place-suggestion"
              >
                {showAllMatieres ? (
                  <p className="p-show-all">
                    {" "}
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
              {showAllMatieres && (
                <ul className="ul-show-all">
                  {matieres.map((matiere, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleClickAllMatiere(matiere.code_matiere)
                      }
                    >
                      {matiere.code_matiere +
                        ": " +
                        matiere.designation_matiere}
                    </li>
                  ))}
                </ul>
              )}
              {!showAllMatieres &&
                suggestions_matieres &&
                suggestions_matieres.length > 0 && (
                  <ul className="ul-show-all">
                    {suggestions_matieres.map((matiere, index) => (
                      <li
                        className="cursor-pointer"
                        key={index}
                        onClick={() =>
                          handleClickSuggestion_matiere(matiere.code_matiere)
                        }
                      >
                        {matiere.code_matiere +
                          ": " +
                          matiere.designation_matiere}
                      </li>
                    ))}
                  </ul>
                )}
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
          {`${isUpdate ? "Valider les modifications" : "Ajouter note"}`}
        </button>
      </form>
    </div>
  );
}

export default NoteForm;

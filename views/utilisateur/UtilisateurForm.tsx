import Password from "@/components/utilisateur/password";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import { isValidEmail } from "@/utils/inputFunction";
import React from "react";
import { FieldErrors, FormState, UseFormRegister } from "react-hook-form";

interface UtilisateurFormProps {
  isUpdate: boolean;
  register: UseFormRegister<Utilisateur>;
  file: any;
  setFile: Function;
  errors: FieldErrors<Utilisateur>;
}

function UtilisateurForm({
  isUpdate,
  register,
  file,
  setFile,
  errors,
}: UtilisateurFormProps) {
  return (
    <div className="flex flex-col items-start w-fit">
      <h2 className="h2 mb-4">Information commun à tous les utilisateurs</h2>
      <form className="container-col-div-input">
        <div className="container-row-div-input ">
          <div className="flex flex-row gap-6 justify-between w-[340px]">
            {!isUpdate && (
              <div className="flex flex-col justify-start relative h-[92px] w-[120px]">
                <label htmlFor="id_utilisateur" className="label">
                  Id utilisateur *
                </label>
                <input
                  type="text"
                  {...register("id_utilisateur", {
                    required: "L'id est obligatoire",
                  })}
                  className={` input-id-utilisateur ${
                    errors?.id_utilisateur?.message ? "hasError" : ""
                  }`}
                  maxLength={10}
                />
                <p className="p-error">{errors?.id_utilisateur?.message}</p>
              </div>
            )}
            <div className="container-input">
              <label htmlFor="file" className="label">
                Photo de profil
              </label>
              <label
                htmlFor="file"
                className="flex items-center -bg--bg-primary-color text-xs w-[196px] h-[40px] overflow-hidden px-4  cursor-pointer border-[1px] rounded-md border-dashed  border-gray-700"
              >
                <span className="truncate">
                  {`${file ? file.name : "Parcourir........"}`}
                </span>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  className="hidden"
                  placeholder="Parcourir"
                  multiple
                />
              </label>
            </div>
          </div>
          <div className="container-input">
            <label htmlFor="telephone" className="label">
              Téléphone *
            </label>
            <input
              type="text"
              {...register("telephone", {
                required: "Le numéro de téléphone est obligatoire",
              })}
              className={`input-form w-[120px] h-[40px] ${
                errors?.telephone?.message ? "hasError" : ""
              }`}
              maxLength={14}
            />
            <p className="p-error">{errors?.telephone?.message}</p>
          </div>
        </div>

        <div className="container-row-div-input">
          <div className="container-input">
            <label htmlFor="nom" className="label">
              Nom *
            </label>
            <input
              type="text"
              {...register("nom", {
                required: "Le nom est obligatoire",
              })}
              className={`input-form ${
                errors?.telephone?.message ? "hasError" : ""
              }`}
              maxLength={50}
            />
            <p className="p-error">{errors.nom?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="prenoms" className="label">
              Prénom(s)
            </label>
            <input
              type="text"
              {...register("prenoms")}
              className="input-form"
              maxLength={60}
            />
          </div>
        </div>

        <div className="container-row-div-input">
          <div className="container-input">
            <label htmlFor="sexe" className="text-gray-700 text-sm">
              Sexe *
            </label>
            <div className="flex flex-row items-center text-[12px] gap-2 h-[40px]">
              <span>Masculin</span>
              <input
                type="radio"
                className="mr-14 w-3 bg-gray-950 outline-2 outline-gray-200"
                value="Masculin"
                {...register("sexe", {
                  required: "Veuillez sélectionner le sexe",
                })}
              />
              <span>Féminin</span>
              <input
                type="radio"
                className="mr-2 w-3 bg-gray-950 outline-2 outline-gray-200"
                value="Féminin"
                {...register("sexe", {
                  required: "Veuillez sélectionner le sexe",
                })}
              />
            </div>
            <p className="p-error">{errors.sexe?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="adresse" className="label">
              Adresse *
            </label>
            <input
              type="text"
              {...register("adresse", {
                required: "L'adresse est obligatoire",
              })}
              className={`input-form ${
                errors?.adresse?.message ? "hasError" : ""
              }`}
              maxLength={60}
            />
            <p className="p-error">{errors.adresse?.message}</p>
          </div>
        </div>

        <div className="container-row-div-input">
          <div className="container-input">
            <label htmlFor="email" className="label">
              Email *
            </label>
            <input
              type="email"
              {...register("email", {
                required: "L'email est obligatoire",
                validate: (value) =>
                  isValidEmail(value) ||
                  "Email doit être comme 'xxxxxxx@esti.mg'",
              })}
              className={`input-form ${
                errors?.email?.message ? "hasError" : ""
              }`}
              placeholder="xxxxxx@esti.mg"
            />
            <p className="p-error"> {errors?.email?.message} </p>
          </div>
          {!isUpdate && (
            <div>
              <Password register={register} errors={errors} />
            </div>
          )}
        </div>
      </form>
      {/* <hr className="border-t-2 border-dotted border-black mt-[36px]" /> */}
    </div>
  );
}

export default UtilisateurForm;

import Calendrier_3 from "@/models/absence/etudiant/Calendrier_3";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Calendrier_3_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Calendrier_3>;
  errors: FieldErrors<Calendrier_3>;
}

function Calendrier_3_Form({
  isUpdate,
  register,
  errors,
}: Calendrier_3_FormProps) {
  return (
    <form className="container-row-div-input">
      {!isUpdate && (
        <div className="container-input">
          <label htmlFor="id_calendrier_3" className="label">
            ID calendrier_3 *
          </label>
          <input
            type="text"
            {...register("id_calendrier_3", {
              required: "L'id calendrier_3 est obligatoire",
            })}
            className={`input-form ${
              errors?.id_calendrier_3?.message ? "hasError" : ""
            }`}
            maxLength={10}
          />
          {errors?.id_calendrier_3 && (
            <p className="p-error">{errors?.id_calendrier_3?.message}</p>
          )}
        </div>
      )}

      <div className="container-input">
        <label htmlFor="date_deb_abs" className="label">
          Date <p className="text-sm inline">(début d'absence)</p> *
        </label>
        <input
          type="date"
          {...register("date_deb_abs", {
            required: "La date de début d'absence est obligatoire",
          })}
          className={`input-form ${
            errors?.date_deb_abs?.message ? "hasError" : ""
          }`}
        />
        {errors?.date_deb_abs && (
          <p className="p-error">{errors.date_deb_abs.message}</p>
        )}
      </div>
      <div className="container-input-heure">
        <label htmlFor="heure_deb_abs" className="label">
          Heure <p className="text-sm inline">(début d'absence)</p> *
        </label>
        <input
          type="time"
          {...register("heure_deb_abs", {
            required: "L'heure est obligatoire",
          })}
          className={`input-form-heure ${
            errors?.heure_deb_abs?.message ? "hasError" : ""
          }`}
        />
        {errors?.heure_deb_abs && (
          <p className="p-error">{errors?.heure_deb_abs?.message}</p>
        )}
      </div>
    </form>
  );
}

export default Calendrier_3_Form;

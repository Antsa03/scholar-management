import Calendrier_4 from "@/models/absence/enseignant/Calendrier_4";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Calendrier_4_FormProps {
  isUpdate: boolean;
  register: UseFormRegister<Calendrier_4>;
  errors: FieldErrors<Calendrier_4>;
}

function Calendrier_4_Form({
  isUpdate,
  register,
  errors,
}: Calendrier_4_FormProps) {
  return (
    <form className="container-row-div-input">
      {!isUpdate && (
        <div className="container-input">
          <label htmlFor="id_calendrier_4" className="label">
            ID calendrier_4 *
          </label>
          <input
            type="text"
            {...register("id_calendrier_4", {
              required: "L'id calendrier_4 est obligatoire",
            })}
            className={`input-form ${
              errors?.id_calendrier_4?.message ? "hasError" : ""
            }`}
            maxLength={10}
          />
          {errors?.id_calendrier_4 && (
            <p className="p-error">{errors.id_calendrier_4.message}</p>
          )}
        </div>
      )}

      <div className="container-input">
        <label htmlFor="date_deb_abs_ens" className="label">
          Date <p className="text-sm inline">(début d'absence)</p> *
        </label>
        <input
          type="date"
          {...register("date_deb_abs_ens", {
            required: "La date de début d'absence enseignant est obligatoire",
          })}
          className={`input-form ${
            errors?.date_deb_abs_ens?.message ? "hasError" : ""
          }`}
        />
        {errors?.date_deb_abs_ens && (
          <p className="p-error">{errors.date_deb_abs_ens.message}</p>
        )}
      </div>
      <div className="container-input">
        <label htmlFor="heure_deb_abs_ens" className="label">
          Heure <p className="text-sm inline">(début d'absence)</p> *
        </label>
        <input
          type="time"
          {...register("heure_deb_abs_ens", {
            required: "L'heure de début de l'absence est obligatoire",
          })}
          className={`input-form-heure ${
            errors?.heure_deb_abs_ens?.message ? "hasError" : ""
          }`}
        />
        {errors?.heure_deb_abs_ens && (
          <p className="p-error">{errors.heure_deb_abs_ens.message}</p>
        )}
      </div>
    </form>
  );
}

export default Calendrier_4_Form;

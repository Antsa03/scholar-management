import Observation from "@/models/information/Observation";
import React from "react";

interface ObservationFormProps {
  isUpdate: boolean;
  observation: Observation;
  handleInputChange: Function;
}

function ObservationForm({
  isUpdate,
  observation,
  handleInputChange,
}: ObservationFormProps) {
  return (
    <div>
      <h2 className="h2 font-poppins-regular mb-2">Formulaire d'observation</h2>
      <form className="container-col-div-input">
        {!isUpdate && (
          <div className="container-input">
            <label htmlFor="id_obs" className="label">
              ID observation
            </label>
            <input
              type="text"
              name="id_obs"
              value={observation.id_obs}
              onChange={(event) => handleInputChange(event)}
              className="input-form"
            />
          </div>
        )}
        <div className="container-input">
          <label htmlFor="admis" className="label">
            Admis
          </label>
          <select
            name="admis"
            value={observation.admis || ""}
            onChange={(event) => handleInputChange(event)}
            className="select-form"
          >
            <option value="">Sélectionner une valeur</option>
            <option value="Passant(e)">Passant(e)</option>
            <option value="Redoublant(e)">Redoublant(e)</option>
          </select>
        </div>
        <div className="container-input">
          <label htmlFor="situation" className="label">
            Situation
          </label>
          <input
            type="text"
            name="situation"
            value={observation.situation || ""}
            onChange={(event) => handleInputChange(event)}
            className="input-form"
          />
        </div>
        <div className="container-input">
          <label htmlFor="date_insc" className="label">
            Date d'inscription
          </label>
          <input
            type="date"
            name="date_insc"
            value={observation.date_insc}
            onChange={(event) => handleInputChange(event)}
            className="input-form"
          />
        </div>
        <div className="container-input">
          <label htmlFor="date_arret" className="label">
            Date d'arrêt
          </label>
          <input
            type="date"
            name="date_arret"
            value={observation.date_arret || ""}
            onChange={(event) => handleInputChange(event)}
            className="input-form"
          />
        </div>
      </form>
    </div>
  );
}

export default ObservationForm;

import Calendrier_2 from "@/models/note_1/Calendrier_2";
import React from "react";

interface Calendrier2FormProps {
  isUpdate: boolean;
  calendrier_2: Calendrier_2;
  handleInputChange: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Calendrier_2_Form({
  isUpdate,
  calendrier_2,
  handleInputChange,
  handleSubmit,
}: Calendrier2FormProps) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {!isUpdate && (
          <div>
            <label htmlFor="id_calendrier">ID calendrier</label>
            <input
              type="text"
              name="id_calendrier_2"
              value={calendrier_2.id_calendrier_2 || ""}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
        )}
        <div>
          <label htmlFor="annee_universitaire_2">Année universitaire</label>
          <input
            type="text"
            name="annee_universitaire_2"
            value={calendrier_2.annee_universitaire_2 || ""}
            onChange={(event) => handleInputChange(event)}
            placeholder="AAAA-AAAA"
          />
        </div>
        <div>
          <label htmlFor="semestre">Semestre</label>
          <input
            type="text"
            name="semestre"
            value={calendrier_2.semestre}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div>
          <label htmlFor="session">Session</label>
          <input
            type="text"
            name="session"
            value={calendrier_2.session}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
}

export default Calendrier_2_Form;

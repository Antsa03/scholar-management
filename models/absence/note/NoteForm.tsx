import Calendrier_2 from "@/models/note_1/Calendrier_2";
import Noter_1 from "@/models/note_1/Noter_1";
import React from "react";

interface NoteFormProps {
  isUpdate: boolean;
  calendrier_2: Calendrier_2[];
  noter_1: Noter_1;
  handleInputChange: Function;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function NoteForm({
  isUpdate,
  calendrier_2,
  noter_1,
  handleInputChange,
  handleSubmit,
}: NoteFormProps) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {!isUpdate && (
          <div>
            <label htmlFor="id_noter_1">ID noter_1</label>
            <input
              type="text"
              name="id_noter_1"
              value={noter_1.id_noter_1}
              onChange={(event) => handleInputChange(event)}
            />
          </div>
        )}
        <div>
          <label htmlFor="id_calendrier_2">ID calendrier_2</label>
          <select
            name="id_calendrier_2"
            value={noter_1.id_calendrier_2 || ""}
            onChange={(event) => handleInputChange(event)}
          >
            <option value="">Sélectionner un calendrier_2</option>
            {calendrier_2.map((calendrier_2, index) => (
              <option key={index} value={calendrier_2.id_calendrier_2}>
                {calendrier_2.id_calendrier_2 +
                  ": " +
                  calendrier_2.annee_universitaire_2 +
                  " " +
                  calendrier_2.semestre +
                  " " +
                  calendrier_2.session}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="num_matricule">N° matricule</label>
          <input
            type="text"
            name="num_matricule"
            value={noter_1.num_matricule || ""}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div>
          <label htmlFor="code_matiere">Code matière</label>
          <input
            type="text"
            name="code_matiere"
            value={noter_1.code_matiere || ""}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div>
          <label htmlFor="note_matiere">Note</label>
          <input
            type="text"
            name="note_matiere"
            value={noter_1.note_matiere}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
}

export default NoteForm;

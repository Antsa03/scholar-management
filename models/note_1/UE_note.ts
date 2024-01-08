import Matiere_note from "./Matiere_note";

export default interface UE_note {
  id_ue: string;
  designation_ue: string;
  credit: string;
  matieres: Matiere_note[];
}

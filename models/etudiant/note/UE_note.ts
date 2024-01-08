import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import Matiere_note from "@/models/note_1/Matiere_note";

export default interface UE_note extends Unite_enseignement {
  v_horaire_ue: string;
  matieres: Matiere_note[];
}

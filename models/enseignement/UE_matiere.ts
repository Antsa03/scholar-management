import Matiere from "./Matiere";

export default interface UE_matiere {
  id_ue: string;
  designation_ue: string;
  credit: number;
  semestre_ue: string;
  matieres: Matiere[];
}

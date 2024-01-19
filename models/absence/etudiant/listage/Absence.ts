import Calendrier_3 from "../Calendrier_3";

export default interface Absence extends Calendrier_3 {
  id_absence: string;
  num_matricule: string;
  code_matiere: string;
  id_calendrier_3: string;
  type_absence: string;
  date_fin_abs: string;
  heure_fin_abs: string;
  justifiee: string;
}

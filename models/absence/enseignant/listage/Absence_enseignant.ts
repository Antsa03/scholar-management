import calendrier_4 from "../Calendrier_4";

export default interface Absence_enseignant extends calendrier_4 {
  id_absence_ens: string;
  code_matiere: string;
  id_calendrier_4: string;
  date_fin_abs_ens: string;
  heure_fin_abs_ens: string;
  justifiee_ens: string;
}

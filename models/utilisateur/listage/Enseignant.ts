import Utilisateur from "../Utilisateur";

export default interface Enseignant extends Utilisateur {
  id_enseignant: string;
  diplome: string;
  grade: string;
  specialite: string;
  date_recrutement: string;
  date_arret_ens: string;
}

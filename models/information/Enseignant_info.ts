import Matiere from "../enseignement/Matiere";
import Utilisateur from "../utilisateur/Utilisateur";

export default interface Enseignant_info extends Utilisateur {
  id_enseignant: string;
  diplome: string;
  grade: string;
  specialite: string;
  date_recrutement: string;
  date_arret_ens: string;
  matieres: Matiere[];
}

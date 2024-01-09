import Utilisateur from "../Utilisateur";

export default interface Etudiant extends Utilisateur {
  num_matricule: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  civilite: string;
}

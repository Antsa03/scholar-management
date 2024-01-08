import UE_note from "./UE_note";

export default interface Etudiant_liste_note {
  nom: string;
  prenoms: string;
  semestre: string;
  session: string;
  id_calendrier_2: string;
  annee_universitaire_2: string;
  id_parcours: string;
  designation_parcours: string;
  num_matricule: string;
  designation_niveau: string;
  groupe: string;
  unite_enseignements: UE_note[];
  somme_coeff: number;
  moy_gen: string;
}

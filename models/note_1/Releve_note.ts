import UE_note from "./UE_note";

export default interface Releve_note {
  nom: string;
  prenoms: string;
  semestre: string;
  session: string;
  id_calendrier_2: string;
  annee_universitaire_2: string;
  num_matricule: string;
  id_niveau: string;
  designation_niveau: string;
  id_parcours: string;
  designation_parcours: string;
  groupe: string;
  unite_enseignements: UE_note[];
  somme_coeff: string;
  moy_semestre: string;
}

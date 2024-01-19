import Relevee_note from "./Releve_note";

export default interface Data_releve {
  imageBase64: string;
  result: Relevee_note;
  moy_ue_tab: string[];
  validation_tab: string[];
  formattedDate: string;
}

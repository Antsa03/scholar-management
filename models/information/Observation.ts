export default interface Observation {
  id_obs: string;
  admis: string;
  situation: string;
  date_insc: string;
  date_arret: string | undefined | null;
}

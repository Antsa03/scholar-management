export default function ExcelDateToJSDate(serial: number) {
  // Excel utilise le 1er janvier 1900 comme date de départ, qui est le jour 2 dans le système de date de JavaScript
  const JS_START_DATE = new Date(1900, 0, 1);

  // Convertir le nombre de jours en millisecondes
  const milliseconds = (serial - 1) * 24 * 60 * 60 * 1000;

  // Créer une nouvelle date à partir du nombre de millisecondes
  const date = new Date(JS_START_DATE.getTime() + milliseconds);

  // Retourner la date au format ISO
  return date;
}

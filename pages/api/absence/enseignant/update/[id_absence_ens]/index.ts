import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Absence_enseignant from "@/models/absence/enseignant/Absence_enseignant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { id_absence_ens } = req.query;
    const absence_enseignant = await prisma.absence_enseignant.findUnique({
      where: { id_absence_ens: id_absence_ens?.toString() },
    });
    if (absence_enseignant) {
      const absence_enseignantProps: Absence_enseignant = req.body;
      const [heures, minutes] = absence_enseignantProps.heure_fin_abs_ens
        .split(":")
        .map(Number);
      const heure_fin_abs_ens_value = new Date();
      heure_fin_abs_ens_value.setFullYear(1971, 0, 1);
      heure_fin_abs_ens_value.setHours(heures);
      heure_fin_abs_ens_value.setMinutes(minutes);
      let justifiee_ens_value = false;
      if (absence_enseignantProps.justifiee_ens === "Oui")
        justifiee_ens_value = true;
      const updateAbsence_enseignant = await prisma.absence_enseignant.update({
        where: { id_absence_ens: absence_enseignant.id_absence_ens },
        data: {
          code_matiere: absence_enseignantProps.code_matiere,
          id_calendrier_4: absence_enseignantProps.id_calendrier_4,
          date_fin_abs_ens: new Date(absence_enseignantProps.date_fin_abs_ens),
          heure_fin_abs_ens: heure_fin_abs_ens_value,
          justifiee_ens: justifiee_ens_value,
        },
      });
      return res.status(200).json(updateAbsence_enseignant);
    } else
      return res
        .status(404)
        .json("ID absence enseignant introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

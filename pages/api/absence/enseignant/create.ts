import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Absence_enseignant from "@/models/absence/enseignant/Absence_enseignant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json("Méthode non autorisé");
  try {
    const absence_enseignantProps: Absence_enseignant = req.body;
    const [heures, minutes] = absence_enseignantProps.heure_fin_abs_ens
      .split(":")
      .map(Number);
    const heure_fin_abs_ens_value = new Date();
    heure_fin_abs_ens_value.setFullYear(1970, 0, 1);
    heure_fin_abs_ens_value.setHours(heures);
    heure_fin_abs_ens_value.setMinutes(minutes);
    const absence_enseignant = await prisma.absence_enseignant.create({
      data: {
        id_absence_ens: absence_enseignantProps.id_absence_ens,
        code_matiere: absence_enseignantProps.code_matiere,
        id_calendrier_4: absence_enseignantProps.id_calendrier_4,
        date_fin_abs_ens: new Date(absence_enseignantProps.date_fin_abs_ens),
        heure_fin_abs_ens: heure_fin_abs_ens_value,
        justifiee_ens: absence_enseignantProps.justifiee_ens === "Oui",
      },
    });
    return res.status(200).json(absence_enseignant);
  } catch (error) {
    return res.status(500).json(error);
  }
}

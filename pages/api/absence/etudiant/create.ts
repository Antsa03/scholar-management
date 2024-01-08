import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Absence from "@/models/absence/etudiant/Absence";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json("Méthode non autorisé");
  try {
    const absenceProps: Absence = req.body;
    const [heures, minutes] = absenceProps.heure_fin_abs.split(":").map(Number);
    const heure_fin_abs_value = new Date();
    heure_fin_abs_value.setFullYear(1970, 0, 1);
    heure_fin_abs_value.setHours(heures);
    heure_fin_abs_value.setMinutes(minutes);
    const absence = await prisma.absence.create({
      data: {
        id_absence: absenceProps.id_absence,
        num_matricule: absenceProps.num_matricule,
        code_matiere: absenceProps.code_matiere,
        id_calendrier_3: absenceProps.id_calendrier_3,
        type_absence: absenceProps.type_absence,
        date_fin_abs: new Date(absenceProps.date_fin_abs),
        heure_fin_abs: heure_fin_abs_value,
        justifiee: absenceProps.justifiee === "Oui",
      },
    });
    return res.status(200).json(absence);
  } catch (error) {
    return res.status(500).json(error);
  }
}

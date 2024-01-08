import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_absence_ens } = req.query;
    const response = await prisma.absence_enseignant.findUnique({
      where: { id_absence_ens: id_absence_ens?.toString() },
    });
    const absence_enseignant = {
      id_absence_ens: response?.id_calendrier_4,
      code_matiere: response?.code_matiere,
      id_calendrier_4: response?.id_calendrier_4,
      date_fin_abs_ens: response?.date_fin_abs_ens.toISOString().slice(0, 10),
      heure_fin_abs_ens: response?.heure_fin_abs_ens.toTimeString().slice(0, 5),
      justifiee_ens: response?.justifiee_ens ? "Oui" : "Non",
    };
    return res.status(200).json(absence_enseignant);
  } catch (error) {
    return res.status(500).json(error);
  }
}

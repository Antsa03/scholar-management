import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_absence } = req.query;
    const response = await prisma.absence.findUnique({
      where: { id_absence: id_absence?.toString() },
    });
    const absence = {
      id_absence: response?.id_absence,
      num_matricule: response?.num_matricule,
      code_matiere: response?.code_matiere,
      id_calendrier_3: response?.id_calendrier_3,
      type_absence: response?.type_absence,
      date_fin_abs: response?.date_fin_abs.toISOString().slice(0, 10),
      heure_fin_abs: response?.heure_fin_abs.toTimeString().slice(0, 5),
      justifiee: response?.justifiee ? "Oui" : "Non",
    };
    return res.status(200).json(absence);
  } catch (error) {
    return res.status(500).json(error);
  }
}

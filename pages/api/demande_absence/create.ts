import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Demande_absence from "@/models/demande_absence/Demande_absence";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json("Méthode non autorisé");
  try {
    const demande_absenceProps: Demande_absence = req.body;
    const demande_absence = await prisma.demande_absence.create({
      data: {
        id_demande_absence: demande_absenceProps.id_demande_absence,
        num_matricule: demande_absenceProps.num_matricule,
        motif: demande_absenceProps.motif,
        date_demandee: new Date(demande_absenceProps.date_demandee),
      },
    });
    return res.status(200).json(demande_absence);
  } catch (error) {
    return res.status(500).json(error);
  }
}

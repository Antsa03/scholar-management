import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Demande_absence from "@/models/demande_absence/Demande_absence";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { id_demande_absence } = req.query;
    const demande_absence = await prisma.demande_absence.findUnique({
      where: { id_demande_absence: id_demande_absence?.toString() },
    });
    if (demande_absence) {
      const demande_absenceProps: Demande_absence = req.body;
      const updateDemande_absence = await prisma.demande_absence.update({
        where: { id_demande_absence: demande_absence.id_demande_absence },
        data: {
          num_matricule: demande_absenceProps.num_matricule,
          motif: demande_absenceProps.motif,
          date_demandee: new Date(demande_absence.date_demandee),
        },
      });
      return res.status(200).json(updateDemande_absence);
    } else
      return res
        .status(404)
        .json("ID demande d'absence introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

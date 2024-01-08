import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE")
    return res.status(401).json("Méthode non autorisé");
  try {
    const { id_demande_absence } = req.query;
    const demande_absence = await prisma.demande_absence.findUnique({
      where: { id_demande_absence: id_demande_absence?.toString() },
    });
    if (demande_absence) {
      const deleteDemande_absence = await prisma.demande_absence.delete({
        where: { id_demande_absence: demande_absence.id_demande_absence },
      });
      return res.status(200).json(deleteDemande_absence);
    } else
      return res
        .status(404)
        .json("ID demande d'absence introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE")
    return res.status(401).json("Méthode non autorisé");
  try {
    const { id_absence_ens } = req.query;
    const absence_enseignant = await prisma.absence_enseignant.findUnique({
      where: { id_absence_ens: id_absence_ens?.toString() },
    });
    if (absence_enseignant) {
      const deleteAbsenceEnseignant = await prisma.absence_enseignant.delete({
        where: { id_absence_ens: absence_enseignant.id_absence_ens },
      });
      return res.status(200).json(deleteAbsenceEnseignant);
    } else
      return res
        .status(404)
        .json("ID absence enseignant introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

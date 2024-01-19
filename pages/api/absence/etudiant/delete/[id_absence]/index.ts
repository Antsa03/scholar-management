import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE")
    return res.status(401).json("Méthode non autorisé");
  try {
    const { id_absence } = req.query;
    const absence = await prisma.absence.findUnique({
      where: { id_absence: id_absence?.toString() },
    });
    if (absence) {
      const deleteAbsence = await prisma.absence.delete({
        where: { id_absence: absence.id_absence },
      });
      return res.status(200).json(deleteAbsence);
    } else return res.status(404).json("ID absence introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

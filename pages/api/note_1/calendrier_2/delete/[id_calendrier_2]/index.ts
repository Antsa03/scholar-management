import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE")
    return res.status(401).json("Méthode non autorisé");
  try {
    const { id_calendrier_2 } = req.query;
    const calendrier_2 = await prisma.calendrier_2.findUnique({
      where: { id_calendrier_2: id_calendrier_2?.toString() },
    });
    if (calendrier_2) {
      const deleteCalendrier_2 = await prisma.calendrier_2.delete({
        where: { id_calendrier_2: calendrier_2.id_calendrier_2 },
      });
      return res.status(201).json(deleteCalendrier_2);
    } else
      return res.status(404).json("ID calendrier_2 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

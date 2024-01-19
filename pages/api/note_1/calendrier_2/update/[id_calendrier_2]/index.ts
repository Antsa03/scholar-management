import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Calendrier_2 from "@/models/note_1/Calendrier_2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { id_calendrier_2 } = req.query;
    const calendrier_2 = await prisma.calendrier_2.findUnique({
      where: { id_calendrier_2: id_calendrier_2?.toString() },
    });
    if (calendrier_2) {
      const calendrier_2Props: Calendrier_2 = req.body;
      const updateCalendrier_2 = await prisma.calendrier_2.update({
        where: { id_calendrier_2: calendrier_2.id_calendrier_2 },
        data: {
          annee_universitaire_2: calendrier_2Props.annee_universitaire_2,
          semestre: calendrier_2Props.semestre,
          session: calendrier_2Props.session,
        },
      });
      return res.status(200).json(updateCalendrier_2);
    } else
      return res.status(404).json("ID calendrier_2 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

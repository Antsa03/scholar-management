import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Calendrier_2 from "@/models/note_1/Calendrier_2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const calendrier_2Props: Calendrier_2 = req.body;
    const calendrier_2 = await prisma.calendrier_2.create({
      data: {
        id_calendrier_2: calendrier_2Props.id_calendrier_2,
        annee_universitaire_2: calendrier_2Props.annee_universitaire_2,
        semestre: calendrier_2Props.semestre,
        session: calendrier_2Props.session,
      },
    });
    return res.status(200).json(calendrier_2);
  } catch (error) {
    return res.status(500).json(error);
  }
}

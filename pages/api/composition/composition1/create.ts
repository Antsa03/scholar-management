import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Composer_1 from "@/models/composition/Composer_1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json("Méthode non autorisé");

  try {
    const composer_1Props: Composer_1 = req.body;

    const find_Calendrier_1 = await prisma.calendrier_1.findUnique({
      where: { annee_universitaire_1: composer_1Props.annee_universitaire_1 },
    });

    if (!find_Calendrier_1) {
      const calendrier_1 = await prisma.calendrier_1.create({
        data: {
          annee_universitaire_1: composer_1Props.annee_universitaire_1,
        },
      });
      res.status(200).json(calendrier_1);
    }
    const composer_1 = await prisma.composer_1.create({
      data: {
        id_composer_1: composer_1Props.id_composer_1,
        code_matiere: composer_1Props.code_matiere,
        id_ue: composer_1Props.id_ue,
        annee_universitaire_1: composer_1Props.annee_universitaire_1,
      },
    });
    return res.status(201).json(composer_1);
  } catch (error) {
    return res.status(500).json(error);
  }
}

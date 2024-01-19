import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Noter_1 from "@/models/note_1/Noter_1";

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json("Méthode non autorisé");
  try {
    const noter_1Props: Noter_1 = req.body;
    const noter_1 = await prisma.noter_1.create({
      data: {
        id_noter_1:
          noter_1Props.num_matricule + "-" + noter_1Props.code_matiere,
        id_calendrier_2: noter_1Props.id_calendrier_2,
        num_matricule: noter_1Props.num_matricule,
        code_matiere: noter_1Props.code_matiere,
        note_matiere: parseFloat(noter_1Props.note_matiere),
      },
    });
    return res.status(200).json(noter_1);
  } catch (error) {
    return res.status(500).json(error);
  }
}

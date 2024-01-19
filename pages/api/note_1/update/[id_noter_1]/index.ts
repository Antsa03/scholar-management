import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Noter_1 from "@/models/note_1/Noter_1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { id_noter_1 } = req.query;
    const noter_1 = await prisma.noter_1.findUnique({
      where: { id_noter_1: id_noter_1?.toString() },
    });
    if (noter_1) {
      const noter_1Props: Noter_1 = req.body;
      const updatenoter_1 = await prisma.noter_1.update({
        where: { id_noter_1: noter_1.id_noter_1 },
        data: {
          id_calendrier_2: noter_1Props.id_calendrier_2,
          num_matricule: noter_1Props.num_matricule,
          code_matiere: noter_1Props.code_matiere,
          note_matiere: parseFloat(noter_1Props.note_matiere),
        },
      });
      return res.status(200).json(updatenoter_1);
    } else return res.status(404).json("ID noter_1 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

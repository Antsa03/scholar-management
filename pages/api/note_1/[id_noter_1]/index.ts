import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Noter_1 from "@/models/note_1/Noter_1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_noter_1 } = req.query;
    const noter_1 = await prisma.noter_1.findUnique({
      where: { id_noter_1: id_noter_1?.toString() },
    });
    if (noter_1) {
      const note: Noter_1 = {
        id_noter_1: noter_1.id_noter_1,
        id_calendrier_2: noter_1.id_calendrier_2,
        num_matricule: noter_1.num_matricule,
        code_matiere: noter_1.code_matiere,
        note_matiere: noter_1.note_matiere.toString(),
      };
      return res.status(200).json(note);
    } else return res.status(404).json("Id noter_1 introuvable");
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Noter_1 from "@/models/note_1/Noter_1";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notes: Noter_1[] = req.body;
    const createPromises = notes.map((note: Noter_1) => {
      return prisma.noter_1.create({
        data: {
          id_noter_1: note.id_noter_1,
          id_calendrier_2: note.id_calendrier_2,
          num_matricule: note.num_matricule,
          code_matiere: note.code_matiere,
          note_matiere: parseFloat(note.note_matiere),
        },
      });
    });
    await prisma.$transaction(createPromises);
    return res.status(200).json("Note enregisté avec succès");
  } catch (error) {
    return res.status(500).json(error);
  }
}

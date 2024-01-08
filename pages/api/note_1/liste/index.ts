import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Noter_1_liste from "@/models/note_1/listage-note/Note_listage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const noter_1 = await prisma.noter_1.findMany({
      include: {
        etudiant: {
          include: {
            utilisateur: true,
          },
        },
      },
      orderBy: {
        id_noter_1: "asc",
      },
    });

    const note: Noter_1_liste[] = noter_1.map((noter) => {
      return {
        id_noter_1: noter.id_noter_1,
        id_calendrier_2: noter.id_calendrier_2,
        num_matricule: noter.num_matricule,
        nom: noter.etudiant.utilisateur.nom,
        prenoms: noter.etudiant.utilisateur.prenoms,
        code_matiere: noter.code_matiere,
        note_matiere: noter.note_matiere.toFixed(2),
      };
    });
    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json(error);
  }
}

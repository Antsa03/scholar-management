import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Noter_1_liste from "@/models/note_1/listage-note/Note_listage";

interface SearchProps {
  search: string;
  code_matiere: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { search, code_matiere }: SearchProps = req.body;
    const notes = await prisma.noter_1.findMany({
      include: {
        etudiant: {
          include: {
            utilisateur: true,
          },
        },
      },
      where: {
        OR: [
          {
            code_matiere: {
              contains: code_matiere.toUpperCase(),
            },
            num_matricule: {
              contains: search,
            },
          },
          {
            etudiant: {
              utilisateur: {
                nom: {
                  contains: search.toUpperCase(),
                },
              },
            },
            code_matiere: {
              contains: code_matiere.toUpperCase(),
            },
          },
        ],
      },
    });
    const notes_final: Noter_1_liste[] = notes.map((note) => {
      return {
        id_noter_1: note.id_noter_1,
        id_calendrier_2: note.id_calendrier_2,
        num_matricule: note.num_matricule,
        nom: note.etudiant.utilisateur.nom,
        prenoms: note.etudiant.utilisateur.prenoms,
        code_matiere: note.code_matiere,
        note_matiere: note.note_matiere.toFixed(2),
      };
    });
    return res.status(200).json(notes_final);
  } catch (error) {
    return res.status(500).json(error);
  }
}

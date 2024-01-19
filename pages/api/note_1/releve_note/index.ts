import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Etudiant from "@/models/note_1/listage-etudiants/Etudiant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await prisma.noter_1.findMany({
      distinct: ["id_calendrier_2", "num_matricule"],
      include: {
        calendrier_2: true,
        etudiant: {
          include: {
            utilisateur: true,
            Information: {
              include: {
                niveau: true,
              },
            },
          },
        },
      },
      orderBy: {
        num_matricule: "asc",
      },
    });

    const etudiants: Etudiant[] = result.map((etudiant) => {
      let designation_niveau = etudiant.etudiant.Information.filter(
        (item) =>
          item &&
          item.annee_universitaire_5 ===
            etudiant.calendrier_2.annee_universitaire_2
      );
      if (!designation_niveau || designation_niveau.length === 0)
        designation_niveau = [];
      return {
        id_calendrier_2: etudiant.calendrier_2.id_calendrier_2,
        num_matricule: etudiant.etudiant.num_matricule,
        annee_universitaire: etudiant.calendrier_2.annee_universitaire_2,
        semestre: etudiant.calendrier_2.semestre,
        nom: etudiant.etudiant.utilisateur.nom,
        prenoms: etudiant.etudiant.utilisateur.prenoms,
        niveau:
          designation_niveau.length === 0
            ? "Pas d'info"
            : designation_niveau[0].niveau.designation_niveau,
      };
    });
    return res.status(200).json(etudiants);
  } catch (error) {
    return res.status(500).json(error);
  }
}

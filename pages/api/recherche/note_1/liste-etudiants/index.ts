import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Etudiant from "@/models/note_1/listage-etudiants/Etudiant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search_value: string = req.body;
    let mots = search_value.split(" ");
    let nom = "";
    let prenoms = "";

    if (mots.length > 1) {
      for (let mot of mots) {
        if (mot === mot.toUpperCase()) {
          nom += mot + " ";
        } else if (mot[0] === mot[0].toUpperCase()) {
          prenoms += mot + " ";
        }
      }

      nom = nom.trim();
      prenoms = prenoms.trim();
    }

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
      where: {
        OR: [
          {
            num_matricule: {
              contains: search_value.trim(),
            },
          },
          {
            etudiant: {
              utilisateur: {
                nom: {
                  contains: search_value.toUpperCase().trim(),
                },
              },
            },
          },
          {
            etudiant: {
              utilisateur: {
                prenoms: {
                  contains: search_value.trim(),
                },
              },
            },
          },
          ...(mots.length > 1
            ? [
                {
                  etudiant: {
                    utilisateur: {
                      nom: {
                        contains: nom,
                      },
                      prenoms: {
                        contains: prenoms,
                      },
                    },
                  },
                },
              ]
            : []),
          {
            calendrier_2: {
              id_calendrier_2: {
                contains: search_value.trim(),
              },
            },
          },
          {
            calendrier_2: {
              annee_universitaire_2: {
                contains: search_value.trim(),
              },
            },
          },
        ],
      },
    });

    const etudiants: Etudiant[] = result.map((etudiant) => {
      let designation_niveau = etudiant.etudiant.Information.filter(
        (item) =>
          item &&
          item.annee_universitaire_5 ===
            etudiant.calendrier_2.annee_universitaire_2
      );
      return {
        id_calendrier_2: etudiant.calendrier_2.id_calendrier_2,
        num_matricule: etudiant.etudiant.num_matricule,
        annee_universitaire: etudiant.calendrier_2.annee_universitaire_2,
        semestre: etudiant.calendrier_2.semestre,
        nom: etudiant.etudiant.utilisateur.nom,
        prenoms: etudiant.etudiant.utilisateur.prenoms,
        niveau: designation_niveau[0].niveau.designation_niveau,
      };
    });
    return res.status(200).json(etudiants);
  } catch (error) {
    return res.status(500).json(error);
  }
}

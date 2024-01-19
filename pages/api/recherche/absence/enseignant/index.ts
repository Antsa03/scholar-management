import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search_value: string = req.body;
    const response = await prisma.absence_enseignant.findMany({
      include: {
        calendrier_4: true,
        matiere: {
          include: {
            enseignant: {
              include: {
                utilisateur: true,
              },
            },
          },
        },
      },
      where: {
        OR: [
          {
            id_absence_ens: {
              contains: search_value.trim(),
            },
          },
          {
            id_calendrier_4: { contains: search_value.trim() },
          },
          {
            code_matiere: {
              contains: search_value.toUpperCase().trim(),
            },
          },
          {
            matiere: {
              enseignant: {
                utilisateur: {
                  nom: search_value.toUpperCase().trim(),
                },
              },
            },
          },
          {
            matiere: {
              enseignant: {
                utilisateur: {
                  prenoms: search_value.trim(),
                },
              },
            },
          },
        ],
      },
      orderBy: {
        id_absence_ens: "asc",
      },
    });
    const absence_enseignants = response.map((absence_enseignant) => {
      return {
        id_calendrier_4: absence_enseignant.calendrier_4.id_calendrier_4,
        date_deb_abs_ens:
          absence_enseignant.calendrier_4.date_deb_abs_ens.toLocaleDateString(),
        heure_deb_abs_ens: absence_enseignant.calendrier_4.heure_deb_abs_ens
          .toTimeString()
          .slice(0, 5),
        id_absence_ens: absence_enseignant.id_absence_ens,
        code_matiere: absence_enseignant.code_matiere,
        date_fin_abs_ens:
          absence_enseignant.date_fin_abs_ens.toLocaleDateString(),
        heure_fin_abs_ens: absence_enseignant.heure_fin_abs_ens
          .toTimeString()
          .slice(0, 5),
        justifiee_ens: absence_enseignant.justifiee_ens ? "Oui" : "Non",
      };
    });
    return res.status(200).json(absence_enseignants);
  } catch (error) {
    return res.status(500).json(error);
  }
}

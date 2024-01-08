import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Enseignant from "@/models/utilisateur/Enseignant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(500).json("Méthode non autorisé");
  else {
    const { id_enseignant } = req.query;
    if (
      !id_enseignant ||
      typeof id_enseignant !== "string" ||
      id_enseignant.trim() === ""
    )
      return res.status(404).json("id_enseignant non valide");
    else {
      try {
        const enseignant = await prisma.enseignant.findUnique({
          where: { id_enseignant: id_enseignant },
        });
        if (enseignant) {
          const enseignantProps: Enseignant = req.body;
          const enseignant = await prisma.enseignant.update({
            where: { id_enseignant: id_enseignant },
            data: {
              diplome: enseignantProps.diplome,
              grade: enseignantProps.grade,
              specialite: enseignantProps.specialite,
              date_recrutement: new Date(enseignantProps.date_recrutement),
              date_arret_ens:
                enseignantProps.date_arret_ens === ""
                  ? null
                  : new Date(enseignantProps.date_arret_ens),
            },
          });
          return res.status(200).json(enseignant);
        } else {
          return res.status(404).json("id_enseignant non trouvée");
        }
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  }
}

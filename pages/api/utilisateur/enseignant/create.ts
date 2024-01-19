import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Enseignant from "@/models/utilisateur/Enseignant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(500).json("Méthode non autorisé");
  else {
    const enseignantProps: Enseignant = req.body;
    try {
      const enseignant = await prisma.enseignant.create({
        data: {
          id_enseignant: enseignantProps.id_enseignant,
          grade: enseignantProps.grade,
          diplome: enseignantProps.diplome,
          specialite: enseignantProps.specialite,
          date_recrutement: new Date(enseignantProps.date_recrutement),
          date_arret_ens:
            enseignantProps.date_arret_ens === ""
              ? null
              : new Date(enseignantProps.date_arret_ens),
          id_utilisateur: enseignantProps.id_utilisateur,
        },
      });
      if (enseignant) return res.status(200).json(enseignant);
      else {
        return res.status(500).json("Utilisateur non créé");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

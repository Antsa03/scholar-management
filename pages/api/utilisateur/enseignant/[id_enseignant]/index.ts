import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Enseignant from "@/models/utilisateur/Enseignant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_enseignant } = req.query;
    const response = await prisma.enseignant.findUnique({
      where: { id_enseignant: id_enseignant?.toString() },
    });
    if (response) {
      const enseignant: Enseignant = {
        id_enseignant: response.id_enseignant,
        id_utilisateur: response.id_utilisateur,
        grade: response.grade,
        diplome: response.diplome,
        specialite: response.specialite ? response.specialite : "",
        date_recrutement: response.date_recrutement.toISOString().slice(0, 10),
        date_arret_ens: response.date_arret_ens
          ? response.date_arret_ens?.toISOString().slice(0, 10)
          : "",
      };
      return res.status(200).json(enseignant);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

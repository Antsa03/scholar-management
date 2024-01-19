import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_enseignant } = req.query;
    const enseignant = await prisma.enseignant.findUnique({
      where: { id_enseignant: id_enseignant?.toString() },
      include: {
        utilisateur: true,
      },
    });
    const matiere_enseignee = await prisma.matiere.findMany({
      where: { id_enseignant: id_enseignant?.toString() },
    });

    const result = {
      id_utilisateur: enseignant?.id_utilisateur,
      id_enseignant: enseignant?.id_enseignant,
      photo_profil: enseignant?.utilisateur.photo_profil,
      nom: enseignant?.utilisateur.nom,
      prenoms: enseignant?.utilisateur.prenoms,
      sexe: enseignant?.utilisateur.sexe,
      adresse: enseignant?.utilisateur.adresse,
      telephone: enseignant?.utilisateur.telephone,
      email: enseignant?.utilisateur.email,
      diplome: enseignant?.diplome,
      grade: enseignant?.grade,
      specialite: enseignant?.specialite,
      date_recrutement: enseignant?.date_recrutement
        ? enseignant.date_recrutement.toLocaleDateString()
        : "",
      date_arret_ens: enseignant?.date_arret_ens
        ? enseignant.date_arret_ens.toLocaleDateString()
        : "",
      matieres: matiere_enseignee,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Etudiant from "@/models/utilisateur/Etudiant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const etudiants = req.body;
  const createPromises = etudiants.map((etudiant: Etudiant) => {
    return prisma.etudiant.create({
      data: {
        num_matricule: etudiant.num_matricule,
        date_naissance: new Date(etudiant.date_naissance),
        lieu_naissance: etudiant.lieu_naissance,
        nationalite: etudiant.nationalite,
        civilite: etudiant.civilite,
        id_utilisateur: etudiant.id_utilisateur,
      },
    });
  });
  try {
    await prisma.$transaction(createPromises);
    return res.status(200).json("Tous les etudiants sont créés");
  } catch (error) {
    console.error(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Etudiant from "@/models/utilisateur/Etudiant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(500).json("Méthode non autorisé");
  }

  const etudiantProps: Etudiant = req.body;

  try {
    const etudiant = await prisma.etudiant.create({
      data: {
        num_matricule: etudiantProps.num_matricule,
        date_naissance: new Date(etudiantProps.date_naissance),
        lieu_naissance: etudiantProps.lieu_naissance,
        nationalite: etudiantProps.nationalite,
        civilite: etudiantProps.civilite,
        id_utilisateur: etudiantProps.id_utilisateur,
      },
    });
    if (etudiant) return res.status(200).json(etudiant);
    else {
      return res.status(500).json("Erreur lors de la création de l'étudiant");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

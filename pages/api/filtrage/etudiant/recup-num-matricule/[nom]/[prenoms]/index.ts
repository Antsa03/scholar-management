import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

interface RequestProps {
  nom: string;
  prenoms: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { nom, prenoms } = req.query;
    if (typeof nom === "string" && typeof prenoms === "string") {
      const etudiant = await prisma.etudiant.findFirst({
        include: {
          utilisateur: true,
        },
        where: {
          utilisateur: {
            nom: {
              contains: nom,
            },
            prenoms: {
              contains: prenoms,
            },
          },
        },
      });
      const num_matricule = etudiant?.num_matricule;
      return res.status(200).json(num_matricule);
    } else return res.status(401).json("Nom ou prénoms invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

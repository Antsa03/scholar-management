import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { Etudiant } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(500).json("Méthode non autorisé");
  else {
    try {
      const { num_matricule } = req.query;
      if (
        !num_matricule ||
        typeof num_matricule !== "string" ||
        num_matricule.trim() === ""
      )
        return res.status(404).json("num_matricule non valide");
      else {
        const etudiant = await prisma.etudiant.findUnique({
          where: { num_matricule: num_matricule },
        });
        if (etudiant) {
          const etudiantProps: Etudiant = req.body;
          const etudiant = await prisma.etudiant.update({
            where: { num_matricule: num_matricule },
            data: {
              date_naissance: new Date(etudiantProps.date_naissance),
              lieu_naissance: etudiantProps.lieu_naissance,
              nationalite: etudiantProps.nationalite,
              civilite: etudiantProps.civilite,
            },
          });
          return res.status(200).json(etudiant);
        } else {
          return res.status(404).json("num_matricule non trouvée");
        }
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

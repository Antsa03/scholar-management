import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.relation.findMany({
      include: {
        responsable_legal: {
          include: {
            utilisateur: true,
          },
        },
        etudiant: {
          include: {
            utilisateur: true,
          },
        },
      },
      orderBy: {
        id_relation: "asc",
      },
    });

    const relations = response.map((relation) => {
      return {
        id_relation: relation.id_relation,
        id_responsable_legal: relation.id_responsable_legal,
        nom_responsable_legal: relation.responsable_legal.utilisateur.nom,
        prenoms_responsable_legal:
          relation.responsable_legal.utilisateur.prenoms,
        num_matricule: relation.num_matricule,
        nom_etudiant: relation.etudiant.utilisateur.nom,
        prenoms_etudiant: relation.etudiant.utilisateur.prenoms,
      };
    });
    return res.status(200).json(relations);
  } catch (error) {
    return res.status(500).json(error);
  }
}

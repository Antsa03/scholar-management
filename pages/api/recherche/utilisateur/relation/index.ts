import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search_value: string = req.body;
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
      where: {
        OR: [
          {
            id_relation: { contains: search_value.trim() },
          },
          {
            id_responsable_legal: {
              contains: search_value.trim(),
            },
          },
          {
            etudiant: {
              num_matricule: {
                contains: search_value.trim(),
              },
            },
          },
          {
            etudiant: {
              utilisateur: {
                nom: {
                  contains: search_value.toUpperCase().trim(),
                },
              },
            },
          },
          {
            etudiant: {
              utilisateur: {
                prenoms: {
                  contains: search_value.trim(),
                },
              },
            },
          },
          {
            responsable_legal: {
              utilisateur: {
                nom: { contains: search_value.toUpperCase().trim() },
              },
            },
          },
          {
            responsable_legal: {
              utilisateur: {
                prenoms: { contains: search_value.trim() },
              },
            },
          },
        ],
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

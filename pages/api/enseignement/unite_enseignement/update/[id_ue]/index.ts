import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(500).json("Méthode non autorisé");
  try {
    const { id_ue } = req.query;
    const unite_enseignement = await prisma.unite_Enseignement.findUnique({
      where: { id_ue: id_ue?.toString() },
    });
    if (unite_enseignement) {
      const unite_enseignementProps: Unite_enseignement = req.body;
      const updateUnite_Enseignement = await prisma.unite_Enseignement.update({
        where: { id_ue: unite_enseignement.id_ue },
        data: {
          designation_ue: unite_enseignementProps.designation_ue,
          credit: parseFloat(unite_enseignementProps.credit),
          semestre_ue: unite_enseignementProps.semestre_ue,
          description_ue: unite_enseignementProps.description_ue,
        },
      });
      return res.status(200).json(updateUnite_Enseignement);
    } else
      return res
        .status(500)
        .json("ID unité d'enseignement introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

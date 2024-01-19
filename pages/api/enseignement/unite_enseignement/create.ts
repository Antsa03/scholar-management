import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "@/prisma/client";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(500).json("Méthode non autorisé");
  try {
    const unite_enseignementProps: Unite_enseignement = req.body;
    const unite_Enseignement = await prisma.unite_Enseignement.create({
      data: {
        id_ue: unite_enseignementProps.id_ue,
        designation_ue: unite_enseignementProps.designation_ue,
        credit: parseFloat(unite_enseignementProps.credit),
        semestre_ue: unite_enseignementProps.semestre_ue,
        description_ue: unite_enseignementProps.description_ue,
      },
    });
    return res.status(200).json(unite_Enseignement);
  } catch (error) {
    return res.status(500).json(error);
  }
}

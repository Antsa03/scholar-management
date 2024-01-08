import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { id_utilisateur } = req.query;
    const photo_profil: string = req.body;
    const updatePhoto_profil = await prisma.utilisateur.update({
      where: {
        id_utilisateur: id_utilisateur as string,
      },
      data: {
        photo_profil: photo_profil,
      },
    });
    return res.status(200).json(updatePhoto_profil);
  } catch (error) {
    return res.status(500).json(error);
  }
}

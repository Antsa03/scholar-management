import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE")
    return res.status(401).json("Méthode non autorisé");
  try {
    const { id_composer_1 } = req.query;
    const composer_1 = await prisma.composer_1.findUnique({
      where: { id_composer_1: id_composer_1?.toString() },
    });
    if (composer_1) {
      const deleteComposer_1 = await prisma.composer_1.delete({
        where: { id_composer_1: composer_1.id_composer_1 },
      });
      return res.status(201).json(deleteComposer_1);
    } else return res.status(404).json("ID composer_1 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

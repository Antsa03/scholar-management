import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_noter_1 } = req.query;
    const noter_1 = await prisma.noter_1.findUnique({
      where: { id_noter_1: id_noter_1?.toString() },
    });
    if (noter_1) {
      const deleteNoter_1 = await prisma.noter_1.delete({
        where: { id_noter_1: noter_1.id_noter_1 },
      });
      return res.status(201).json(deleteNoter_1);
    } else return res.status(404).json("ID noter_1 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const annnee_universitaire_1 = await prisma.composer_1.findMany({
      distinct: ["annee_universitaire_1"],
    });

    return res.status(200).json(annnee_universitaire_1);
  } catch (error) {
    return res.status(500).json(error);
  }
}

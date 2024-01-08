import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const matiere = await prisma.matiere.findMany({
      orderBy: {
        code_matiere: "asc",
      },
    });
    return res.status(200).json(matiere);
  } catch (error) {
    return res.status(500).json(error);
  }
}

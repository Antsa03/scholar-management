import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { code_matiere } = req.query;
    const matiere = await prisma.matiere.findUnique({
      where: { code_matiere: code_matiere?.toString() },
    });
    return res.status(200).json(matiere);
  } catch (error) {
    return res.status(500).json(error);
  }
}

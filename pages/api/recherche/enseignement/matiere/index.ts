import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search_value: string = req.body;
    const matiere = await prisma.matiere.findMany({
      where: {
        OR: [
          {
            code_matiere: {
              contains: search_value.toUpperCase(),
            },
          },
          {
            designation_matiere: {
              contains: search_value.trim(),
            },
          },
        ],
      },
      orderBy: {
        code_matiere: "asc",
      },
    });
    return res.status(200).json(matiere);
  } catch (error) {
    return res.status(500).json(error);
  }
}

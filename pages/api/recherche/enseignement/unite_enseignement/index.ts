import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search_value: string = req.body;
    const unite_enseignement = await prisma.unite_Enseignement.findMany({
      where: {
        OR: [
          {
            id_ue: {
              contains: search_value.toUpperCase().trim(),
            },
          },
          {
            designation_ue: {
              contains: search_value.trim(),
            },
          },
          {
            semestre_ue: {
              contains: search_value.trim(),
            },
          },
        ],
      },
      orderBy: {
        id_ue: "asc",
      },
    });
    return res.status(200).json(unite_enseignement);
  } catch (error) {
    return res.status(500).json(error);
  }
}

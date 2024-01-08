import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const unite_enseignement = await prisma.unite_Enseignement.findMany({
      orderBy: {
        id_ue: "asc",
      },
    });
    return res.status(200).json(unite_enseignement);
  } catch (error) {
    return res.status(500).json(error);
  }
}

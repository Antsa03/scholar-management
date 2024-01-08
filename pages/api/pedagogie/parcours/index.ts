import { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const parcours = await prisma.parcours.findMany({
      orderBy: {
        id_parcours: "asc",
      },
    });
    return res.status(200).json(parcours);
  } catch (error) {
    return res.status(500).json(error);
  }
}

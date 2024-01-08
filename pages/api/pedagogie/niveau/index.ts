import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const niveau = await prisma.niveau.findMany({
      orderBy: {
        id_niveau: "asc",
      },
    });
    return res.status(200).json(niveau);
  } catch (error) {
    return res.status(500).json(error);
  }
}

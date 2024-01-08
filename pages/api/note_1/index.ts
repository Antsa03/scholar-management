import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const noter_1 = await prisma.noter_1.findMany({
      orderBy: {
        id_noter_1: "asc",
      },
    });
    return res.status(200).json(noter_1);
  } catch (error) {
    return res.status(500).json(error);
  }
}

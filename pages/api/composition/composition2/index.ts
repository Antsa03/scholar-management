import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const composer_2 = await prisma.composer_2.findMany({
      orderBy: {
        id_composer_2: "asc",
      },
    });
    return res.status(200).json(composer_2);
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const composer_3 = await prisma.composer_3.findMany({
      orderBy: {
        id_composer_3: "asc",
      },
    });
    return res.status(200).json(composer_3);
  } catch (error) {
    return res.status(500).json(error);
  }
}

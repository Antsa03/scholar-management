import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_composer_1 } = req.query;
    const composer_1 = await prisma.composer_1.findUnique({
      where: { id_composer_1: id_composer_1?.toString() },
    });
    return res.status(200).json(composer_1);
  } catch (error) {
    return res.status(500).json(error);
  }
}

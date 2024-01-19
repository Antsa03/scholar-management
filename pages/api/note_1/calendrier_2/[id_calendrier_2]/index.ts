import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_calendrier_2 } = req.query;
    const calendrier_2 = await prisma.calendrier_2.findUnique({
      where: { id_calendrier_2: id_calendrier_2?.toString() },
    });
    return res.status(200).json(calendrier_2);
  } catch (error) {
    return res.status(500).json(error);
  }
}

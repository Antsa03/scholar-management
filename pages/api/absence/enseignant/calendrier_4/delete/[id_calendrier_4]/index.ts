import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_calendrier_4 } = req.query;
    const calendrier_4 = await prisma.calendrier_4.findUnique({
      where: { id_calendrier_4: id_calendrier_4?.toString() },
    });
    if (calendrier_4) {
      const deleteCalendrier_4 = await prisma.calendrier_4.delete({
        where: { id_calendrier_4: calendrier_4.id_calendrier_4 },
      });
      return res.status(201).json(deleteCalendrier_4);
    } else
      return res.status(404).json("ID calendrier_4 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_calendrier_3 } = req.query;
    const calendrier_3 = await prisma.calendrier_3.findUnique({
      where: { id_calendrier_3: id_calendrier_3?.toString() },
    });
    if (calendrier_3) {
      const deleteCalendrier_3 = await prisma.calendrier_3.delete({
        where: { id_calendrier_3: calendrier_3.id_calendrier_3 },
      });
      return res.status(201).json(deleteCalendrier_3);
    } else
      return res.status(404).json("Id calendrier_3 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

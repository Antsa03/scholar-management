import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_calendrier_3 } = req.query;
    const response = await prisma.calendrier_3.findUnique({
      where: { id_calendrier_3: id_calendrier_3?.toString() },
    });
    const calendrier_3 = {
      id_calendrier_3: response?.id_calendrier_3,
      date_deb_abs: response?.date_deb_abs.toISOString().slice(0, 10),
      heure_deb_abs: response?.heure_deb_abs.toTimeString().slice(0, 5),
    };
    return res.status(200).json(calendrier_3);
  } catch (error) {
    return res.status(500).json(error);
  }
}

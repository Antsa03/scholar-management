import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Calendrier_3 from "@/models/absence/etudiant/Calendrier_3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.calendrier_3.findMany({
      orderBy: {
        id_calendrier_3: "asc",
      },
    });
    const calendrier_3: Calendrier_3[] = response.map((cal) => {
      return {
        id_calendrier_3: cal.id_calendrier_3,
        date_deb_abs: cal.date_deb_abs.toISOString().slice(0, 10),
        heure_deb_abs: cal.heure_deb_abs.toTimeString(),
      };
    });
    return res.status(200).json(calendrier_3);
  } catch (error) {
    return res.status(500).json(error);
  }
}

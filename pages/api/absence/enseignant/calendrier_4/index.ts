import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import calendrier_4 from "@/models/absence/enseignant/Calendrier_4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.calendrier_4.findMany({
      orderBy: {
        id_calendrier_4: "asc",
      },
    });
    const calendrier_4: calendrier_4[] = response.map((calendrier) => {
      return {
        id_calendrier_4: calendrier.id_calendrier_4,
        date_deb_abs_ens: calendrier.date_deb_abs_ens.toLocaleDateString(),
        heure_deb_abs_ens: calendrier.heure_deb_abs_ens
          .toTimeString()
          .slice(0, 5),
      };
    });
    return res.status(200).json(calendrier_4);
  } catch (error) {
    return res.status(500).json(error);
  }
}

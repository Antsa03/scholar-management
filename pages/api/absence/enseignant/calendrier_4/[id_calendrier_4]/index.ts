import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import calendrier_4 from "@/models/absence/enseignant/Calendrier_4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_calendrier_4 } = req.query;
    const response = await prisma.calendrier_4.findUnique({
      where: { id_calendrier_4: id_calendrier_4?.toString() },
    });
    const calendrier_4: calendrier_4 = {
      id_calendrier_4: response?.id_calendrier_4.toString() || "",
      date_deb_abs_ens:
        response?.date_deb_abs_ens.toISOString().slice(0, 10) || "",
      heure_deb_abs_ens:
        response?.heure_deb_abs_ens.toTimeString().slice(0, 5) || "",
    };
    return res.status(200).json(calendrier_4);
  } catch (error) {
    return res.status(500).json(error);
  }
}

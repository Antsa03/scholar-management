import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Calendrier_3 from "@/models/absence/etudiant/Calendrier_3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json("Méthode non autorisé");
  try {
    const calendrier_3Props: Calendrier_3 = req.body;
    const [heures, minutes] = calendrier_3Props.heure_deb_abs
      .split(":")
      .map(Number);
    const heure_deb_abs_value = new Date();
    heure_deb_abs_value.setFullYear(1970, 0, 1);
    heure_deb_abs_value.setHours(heures);
    heure_deb_abs_value.setMinutes(minutes);

    const calendrier_3 = await prisma.calendrier_3.create({
      data: {
        id_calendrier_3: calendrier_3Props.id_calendrier_3,
        date_deb_abs: new Date(calendrier_3Props.date_deb_abs),
        heure_deb_abs: heure_deb_abs_value,
      },
    });
    return res.status(200).json(calendrier_3);
  } catch (error) {
    return res.status(500).json(error);
  }
}

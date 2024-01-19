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
      const calendrier_3Props = req.body;
      const [heures, minutes] = calendrier_3Props.heure_deb_abs
        .split(":")
        .map(Number);
      const heure_deb_abs_value = new Date();
      heure_deb_abs_value.setFullYear(1970, 0, 1);
      heure_deb_abs_value.setHours(heures);
      heure_deb_abs_value.setMinutes(minutes);
      const updateCalendrier_3 = await prisma.calendrier_3.update({
        where: { id_calendrier_3: calendrier_3.id_calendrier_3 },
        data: {
          date_deb_abs: new Date(calendrier_3Props.date_deb_abs),
          heure_deb_abs: heure_deb_abs_value,
        },
      });
      return res.status(200).json(updateCalendrier_3);
    } else
      return res.status(404).json("Id calendrier_3 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

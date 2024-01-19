import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import calendrier_4 from "@/models/absence/enseignant/Calendrier_4";

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
      const calendrier_4Props: calendrier_4 = req.body;
      const [heures, minutes] = calendrier_4Props.heure_deb_abs_ens
        .split(":")
        .map(Number);
      const heure_deb_abs_ens_value = new Date();
      heure_deb_abs_ens_value.setFullYear(1970, 0, 1);
      heure_deb_abs_ens_value.setHours(heures);
      heure_deb_abs_ens_value.setMinutes(minutes);
      const updateCalendrier_4 = await prisma.calendrier_4.update({
        where: { id_calendrier_4: calendrier_4.id_calendrier_4 },
        data: {
          date_deb_abs_ens: new Date(calendrier_4Props.date_deb_abs_ens),
          heure_deb_abs_ens: heure_deb_abs_ens_value,
        },
      });
      return res.status(200).json(updateCalendrier_4);
    } else
      return res.status(404).json("ID calendrier_4 introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

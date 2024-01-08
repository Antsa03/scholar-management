import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Observation from "@/models/information/Observation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json("Méthode non autorisé");
  try {
    const observationProps: Observation = req.body;
    let isDate_value = false;
    if (observationProps.date_arret !== "") isDate_value = true;
    const default_date = new Date();
    default_date.setFullYear(1970, 0, 1);
    let admis_value = false;
    if (observationProps.admis === "Passant(e)") admis_value = true;
    const observation = await prisma.observation.create({
      data: {
        id_obs: observationProps.id_obs,
        admis: admis_value,
        situation: observationProps.situation,
        date_insc: new Date(observationProps.date_insc),
        date_arret: isDate_value
          ? new Date(observationProps.date_arret)
          : default_date,
      },
    });
    return res.status(200).json(observation);
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Observation from "@/models/information/Observation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { id_obs } = req.query;
    const observation = await prisma.observation.findUnique({
      where: { id_obs: id_obs?.toString() },
    });
    if (observation) {
      const observationProps: Observation = req.body;
      const default_date = new Date();
      default_date.setFullYear(1970, 0, 1);
      let admis_value = false;
      if (observationProps.admis === "Passant(e)") admis_value = true;
      const updateObservation = await prisma.observation.update({
        where: { id_obs: observation.id_obs },
        data: {
          admis: admis_value,
          situation: observationProps.situation,
          date_insc: new Date(observationProps.date_insc),
          date_arret:
            observationProps.date_arret === ""
              ? null
              : new Date(observationProps.date_arret as string),
        },
      });
      return res.status(200).json(updateObservation);
    } else
      return res.status(404).json("ID observation introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Observation from "@/models/information/Observation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const observations = req.body;
  const createPromises = observations.map((observation: Observation) => {
    return prisma.observation.create({
      data: {
        id_obs: observation.id_obs.toString(),
        admis: observation.admis === "Oui",
        situation: observation.situation,
        date_insc: new Date(observation.date_insc),
        date_arret:
          observation.date_arret === ""
            ? null
            : new Date(observation.date_arret as string),
      },
    });
  });

  try {
    await prisma.$transaction(createPromises);
    return res.status(200).json("Observation créée avec succès");
  } catch (error) {
    return res.status(500).json(error);
  }
}

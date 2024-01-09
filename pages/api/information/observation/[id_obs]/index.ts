import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_obs } = req.query;
    const response = await prisma.observation.findUnique({
      where: { id_obs: id_obs?.toString() },
    });
    const observation = {
      id_obs: response?.id_obs,
      admis: response?.admis ? "Passant(e)" : "Redoublant(e)",
      situation: response?.situation,
      date_insc: response?.date_insc.toISOString().slice(0, 10),
      date_arret:
        response?.date_arret === null
          ? null
          : response?.date_arret.toISOString().slice(0, 10),
    };
    return res.status(200).json(observation);
  } catch (error) {
    return res.status(500).json(error);
  }
}

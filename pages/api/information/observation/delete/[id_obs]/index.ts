import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_obs } = req.query;
    const observation = await prisma.observation.findUnique({
      where: { id_obs: id_obs?.toString() },
    });
    if (observation) {
      const deleteObservation = await prisma.observation.delete({
        where: { id_obs: observation.id_obs },
      });
      return res.status(200).json(deleteObservation);
    } else return res.status(404).json("ID observation non trouvé");
  } catch (error) {
    return res.status(500).json(error);
  }
}

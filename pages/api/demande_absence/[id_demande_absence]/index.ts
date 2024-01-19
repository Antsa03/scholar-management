import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_demande_absence } = req.query;
    const response = await prisma.demande_absence.findUnique({
      where: { id_demande_absence: id_demande_absence?.toString() },
    });
    const demande_absence = {
      id_demande_absence: response?.id_demande_absence,
      num_matricule: response?.num_matricule,
      motif: response?.motif,
      date_demandee: response?.date_demandee.toISOString().slice(0, 10),
    };
    return res.status(200).json(demande_absence);
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.demande_absence.findMany({
      orderBy: {
        id_demande_absence: "asc",
      },
    });
    const demande_absences = response.map((demande_absence) => {
      return {
        id_demande_absence: demande_absence.id_demande_absence,
        num_matricule: demande_absence.num_matricule,
        motif: demande_absence.motif,
        date_demandee: demande_absence.date_demandee.toLocaleDateString(),
      };
    });
    return res.status(200).json(demande_absences);
  } catch (error) {
    return res.status(500).json(error);
  }
}

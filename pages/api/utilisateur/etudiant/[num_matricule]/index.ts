import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { num_matricule } = req.query;
  const data = await prisma.etudiant.findUnique({
    where: { num_matricule: num_matricule?.toString() },
  });
  const etudiant = {
    num_matricule: data?.num_matricule,
    date_naissance: data?.date_naissance.toISOString().slice(0, 10),
    lieu_naissance: data?.lieu_naissance,
    nationalite: data?.nationalite,
    civilite: data?.civilite,
  };
  return res.status(200).json(etudiant);
}

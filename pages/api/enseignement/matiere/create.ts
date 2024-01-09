import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Matiere from "@/models/enseignement/Matiere";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(500).json("Méthode non autorisé");

  try {
    const matiereProps: Matiere = req.body;
    const matiere = await prisma.matiere.create({
      data: {
        code_matiere: matiereProps.code_matiere,
        designation_matiere: matiereProps.designation_matiere,
        coeff: parseFloat(matiereProps.coeff),
        credit_matiere: parseFloat(matiereProps.credit_matiere),
        v_horaire_matiere: parseInt(matiereProps.v_horaire_matiere),
        description: matiereProps.description,
        id_enseignant: matiereProps.id_enseignant,
      },
    });
    return res.status(200).json(matiere);
  } catch (error) {
    return res.status(500).json(error);
  }
}

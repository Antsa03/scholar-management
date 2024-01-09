import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Matiere from "@/models/enseignement/Matiere";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(500).json("Méthode non autorisé");

  try {
    const { code_matiere } = req.query;
    const matiere = await prisma.matiere.findUnique({
      where: { code_matiere: code_matiere?.toString() },
    });
    if (matiere) {
      const matiereProps: Matiere = req.body;
      const updateMatiere = await prisma.matiere.update({
        where: { code_matiere: matiere.code_matiere },
        data: {
          designation_matiere: matiereProps.designation_matiere,
          coeff: parseFloat(matiereProps.coeff),
          credit_matiere: parseFloat(matiereProps.credit_matiere),
          v_horaire_matiere: parseInt(matiereProps.v_horaire_matiere),
          description: matiereProps.description,
          id_enseignant: matiereProps.id_enseignant,
        },
      });
      return res.status(200).json(updateMatiere);
    } else return res.status(404).json("Code matière introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

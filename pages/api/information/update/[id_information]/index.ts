import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Information from "@/models/information/Information";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(401).json("Méthode non autorisé");
  try {
    const { id_information } = req.query;
    const informationProps: Information = req.body;
    const information = await prisma.information.findUnique({
      where: { id_information: id_information?.toString() },
    });
    if (information) {
      const updateCalendrier_5 = await prisma.calendrier_5.update({
        where: { annee_universitaire_5: information.annee_universitaire_5 },
        data: { annee_universitaire_5: informationProps.annee_universitaire_5 },
      });
      res.status(201).json(updateCalendrier_5);
      const updateinformation = await prisma.information.update({
        where: { id_information: information.id_information },
        data: {
          num_matricule: information.num_matricule,
          id_obs: informationProps.id_obs,
          id_niveau: informationProps.id_niveau,
          groupe: informationProps.groupe,
        },
      });
      return res.status(200).json(updateinformation);
    } else res.status(404).json("Information introuvable ou invalide");
  } catch (error) {
    return res.status(500).json(error);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Information from "@/models/information/Information";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json("Méthode non autorisé");
  try {
    const informationProps: Information = req.body;
    const calendrier_5 = await prisma.calendrier_5.findUnique({
      where: { annee_universitaire_5: informationProps.annee_universitaire_5 },
    });
    if (!calendrier_5) {
      const create_calendrier_5 = await prisma.calendrier_5.create({
        data: { annee_universitaire_5: informationProps.annee_universitaire_5 },
      });
      res.status(201).json(create_calendrier_5);
    }
    const information = await prisma.information.create({
      data: {
        id_information: informationProps.id_information,
        num_matricule: informationProps.num_matricule,
        annee_universitaire_5: informationProps.annee_universitaire_5,
        id_obs: informationProps.id_obs,
        id_niveau: informationProps.id_niveau,
        groupe: informationProps.groupe,
      },
    });
    return res.status(200).json(information);
  } catch (error) {
    return res.status(500).json(error);
  }
}

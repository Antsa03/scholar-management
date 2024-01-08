import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Information from "@/models/information/Information";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const informations: Information[] = req.body;
  const findCalendrier_5 = await prisma.calendrier_5.findUnique({
    where: { annee_universitaire_5: informations[0].annee_universitaire_5 },
  });
  if (!findCalendrier_5) {
    const create_calendrier_5 = await prisma.calendrier_5.create({
      data: {
        annee_universitaire_5: informations[0].annee_universitaire_5,
      },
    });
    if (create_calendrier_5) console.log("Calendrier_5 créé avec succès");
  }
  const createPromises = informations.map((information: Information) => {
    return prisma.information.create({
      data: information,
    });
  });

  try {
    await prisma.$transaction(createPromises);
    return res.status(200).json("Information créée avec succès");
  } catch (error) {
    return res.status(500).json(error);
  }
}

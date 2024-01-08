import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const information = await prisma.information.findMany({
      distinct: ["annee_universitaire_5"],
      orderBy: {
        annee_universitaire_5: "desc",
      },
    });
    const annee_universitaire: string[] = [];
    information.map((info) => {
      annee_universitaire.push(info.annee_universitaire_5);
    });
    return res.status(200).json(annee_universitaire);
  } catch (error) {
    return res.status(500).json(error);
  }
}

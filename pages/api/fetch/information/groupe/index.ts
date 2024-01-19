import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const information = await prisma.information.findMany({
      distinct: ["groupe"],
      orderBy: {
        groupe: "asc",
      },
    });

    const groupe: string[] = [];
    information.map((info) => {
      groupe.push(info.groupe);
    });
    return res.status(200).json(groupe);
  } catch (error) {
    return res.status(500).json(error);
  }
}

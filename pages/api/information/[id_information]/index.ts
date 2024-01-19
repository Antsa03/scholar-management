import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id_information } = req.query;
    const information = await prisma.information.findUnique({
      where: { id_information: id_information?.toString() },
    });
    return res.status(200).json(information);
  } catch (error) {
    return res.status(500).json(error);
  }
}

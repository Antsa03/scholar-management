import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const observation = await prisma.observation.findMany();
    return res.status(200).json(observation);
  } catch (error) {
    return res.status(500).json(error);
  }
}

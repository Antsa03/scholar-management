import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_parcours } = req.query;
        const parcours = await prisma.parcours.findUnique({
            where: { id_parcours: id_parcours?.toString() }
        });
        return res.status(200).json(parcours);
    } catch (error) {
        return res.status(500).json(error);
    }
}
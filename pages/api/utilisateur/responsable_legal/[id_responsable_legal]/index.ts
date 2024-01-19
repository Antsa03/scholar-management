import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_responsable_legal } = req.query;
        const responsable_legal = await prisma.responsable_legal.findUnique({
            where: { id_responsable_legal: id_responsable_legal?.toString() }
        });
        return res.status(200).json(responsable_legal)
    } catch (error) {
        return res.status(500).json(error);
    }
}
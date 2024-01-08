import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_relation } = req.query;
        const relation = await prisma.relation.findUnique({
            where: { id_relation: id_relation?.toString() }
        })
        return res.status(200).json(relation);
    } catch(error) {
        return res.status(500).json(error);
    }
}

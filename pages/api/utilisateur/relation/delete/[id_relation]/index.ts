import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "DELETE")
        return res.status(500).json("Méthode non autorisée");
    try {
        const { id_relation } = req.query;
        const relation = await prisma.relation.findUnique({
            where: { id_relation: id_relation?.toString() }
        });
        if(relation) {
            const deleteRelation = await prisma.relation.delete({
                where: { id_relation: relation.id_relation }
            });
            return res.status(200).json(deleteRelation);
        } else {
            return res.status(500).json("ID relation introuvable");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}
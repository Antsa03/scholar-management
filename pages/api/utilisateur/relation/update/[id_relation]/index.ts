import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "PUT") 
        return res.status(500).json("Méthode non autorisé");
    else {
        try {
            const { id_relation } = req.query;
            const relation = await prisma.relation.findUnique({
                where: { id_relation: id_relation?.toString() }
            });
            if(relation) {
                const relationProps = req.body;
                const updateRelation = await prisma.relation.update({
                    where: {id_relation: relation.id_relation},
                    data : {
                        id_responsable_legal: relationProps.id_responsable_legal,
                        num_matricule: relationProps.num_matricule
                    }
                });
                return res.status(200).json(updateRelation);
            } else {
                return res.status(500).json("ID relation introuvable");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
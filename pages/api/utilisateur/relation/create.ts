import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') 
        return res.status(500).json("Méthode non trouvé");
    else {
        try {
            const relationProps = req.body;
            const relation = await prisma.relation.create({
                data: {
                    id_relation: relationProps.id_relation,
                    id_responsable_legal: relationProps.id_responsable_legal,
                    num_matricule: relationProps.num_matricule
                }
            });
            return res.status(200).json(relation);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { Responsable_legal } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "PUT") 
        return res.status(500).json("Méthode non autorisé");
    else {
        try {
            const { id_responsable_legal } = req.query;
            if(!id_responsable_legal || typeof id_responsable_legal !== "string" || id_responsable_legal.trim() === "")
                return res.status(404).json("id_responsable_legal non valide");
            else {
            const responsable_legal = await prisma.responsable_legal.findUnique({
                where: { id_responsable_legal: id_responsable_legal }
            });
            if(responsable_legal) {
                const responsable_legalProps : Responsable_legal = req.body;
                const responsable_legal = await prisma.responsable_legal.update({
                    where: { id_responsable_legal: id_responsable_legal },
                    data: {
                        profession: responsable_legalProps.profession
                    }
                });
                return res.status(200).json(responsable_legal);
            } else {
                return res.status(404).json("id_responsable_legal non trouvée");
            }
        }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
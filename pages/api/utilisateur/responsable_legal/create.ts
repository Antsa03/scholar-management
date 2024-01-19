import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { Responsable_legal } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST")
        return res.status(500).json("Méthode non autorisé");

    else {
        try {
            const responsable_legalProps : Responsable_legal = req.body;
            const responsable_legal = await prisma.responsable_legal.create({
                data: {
                    id_responsable_legal: responsable_legalProps.id_responsable_legal,
                    profession: responsable_legalProps.profession,
                    id_utilisateur: responsable_legalProps.id_utilisateur
                }
            });
            return res.status(200).json(responsable_legal);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
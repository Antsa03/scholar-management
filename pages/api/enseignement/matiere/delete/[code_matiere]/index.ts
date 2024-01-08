import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'DELETE') 
        return res.status(500).json("Méthode non autorisé");

    try {
        const { code_matiere } = req.query;
        const matiere = await prisma.matiere.findUnique({
            where: { code_matiere: code_matiere?.toString() }
        });
        if(matiere) {
            const deleteMatiere = await prisma.matiere.delete({
                where: { code_matiere: matiere.code_matiere }
            });
            return res.status(201).json(deleteMatiere);
        } else 
            return res.status(404).json("Code matiere introuvable ou invalide");
    } catch(error) {
        return res.status(500).json(error);
    }
}

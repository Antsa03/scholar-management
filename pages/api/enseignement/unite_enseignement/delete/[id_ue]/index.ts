import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'DELETE')
        return res.status(500).json("Méthode non autorisé");

    try {
        const { id_ue } = req.query;
        const unite_Enseignement = await prisma.unite_Enseignement.findUnique({
            where: { id_ue: id_ue?.toString() }
        });
        if(unite_Enseignement) {
            const deleteUniteEnseignement = await prisma.unite_Enseignement.delete({
                where: { id_ue: unite_Enseignement.id_ue }
            });
            return res.status(201).json(deleteUniteEnseignement);
        } else 
            return res.status(404).json("ID enseignement introuvable ou invalide");
    } catch (error) {
        return res.status(500).json(error);
    }
}

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'DELETE') 
        return res.status(500).json("Méthode non autorisé");

    try {
        const { id_niveau } = req.query;
        const niveau = await prisma.niveau.findUnique({
            where: {id_niveau: id_niveau?.toString()}
        })
        if(niveau) {
            const deleteNiveau = await prisma.niveau.delete({
                where: {id_niveau: niveau.id_niveau}
            });
            return res.status(200).json(deleteNiveau);
        } else 
            return res.status(500).json("ID niveau introuvable ou invalide");
    } catch (error) {
        return res.status(500).json(error);
    }
}
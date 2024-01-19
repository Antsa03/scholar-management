import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'DELETE')
        return res.status(500).json("Méthode non autorisé");
    try {
        const { id_parcours } = req.query;
        const parcours = await prisma.parcours.findUnique({
            where: {id_parcours: id_parcours?.toString()}
        });
        if(parcours) {
            const deleteParcours = await prisma.parcours.delete({
                where: {id_parcours: parcours.id_parcours}
            });
            return res.status(200).json(deleteParcours);
        } else 
            return res.status(500).json("ID parcours introuvable ou invalide");
    } catch (error) {
        return res.status(500).json(error);
    }
}
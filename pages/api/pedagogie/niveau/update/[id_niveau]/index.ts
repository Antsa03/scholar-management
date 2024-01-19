import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id_niveau } = req.query;
        const niveau = await prisma.niveau.findUnique({
            where: { id_niveau: id_niveau?.toString() }
        });
        if(niveau) {
            const niveauProps = req.body;
            const updateNiveau = await prisma.niveau.update({
                where: { id_niveau: niveau.id_niveau },
                data: {
                    designation_niveau: niveauProps.designation_niveau
                }
            });
            return res.status(200).json(updateNiveau);
        }
        else 
            return res.status(500).json("ID niveau introuvable");
    } catch (error) {
        return res.status(500).json(error);
    }
}
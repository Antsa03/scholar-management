import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST')
        return res.status(500).json("Méthode non autorisé");
    try {
        const niveauProps = req.body;
        const niveau = await prisma.niveau.create({
            data: {
                id_niveau: niveauProps.id_niveau,
                designation_niveau: niveauProps.designation_niveau
            }
        });
        return res.status(200).json(niveau);
    } catch(error) {
        return res.status(500).json(error);
    }
}
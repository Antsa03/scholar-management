import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Composer_3 from "@/models/composition/Composer_3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST')
        return res.status(500).json("Méthode non autorisé");

    try {
        const composer_3Props : Composer_3 = req.body;
        const composer_3 = await prisma.composer_3.create({
            data: {
                id_composer_3: composer_3Props.id_composer_3,
                id_niveau: composer_3Props.id_niveau,
                id_parcours: composer_3Props.id_parcours
            }
        });
        return res.status(200).json(composer_3);
    } catch (error) {
        return res.status(500).json(error);
    }
}

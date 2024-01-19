import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Composer_3 from "@/models/composition/Composer_3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'PUT')
        return res.status(500).json("Méthode non autorisé");

    try {
        const { id_composer_3 } = req.query;
        const composer_3 = await prisma.composer_3.findUnique({
            where: { id_composer_3: id_composer_3?.toString() }
        });

        if(composer_3) {
            const composer_3Props : Composer_3 = req.body;
            const updateComposer3 = await prisma.composer_3.update({
                where: { id_composer_3: composer_3.id_composer_3 },
                data: {
                    id_niveau: composer_3Props.id_niveau,
                    id_parcours: composer_3Props.id_parcours
                }
            });
            return res.status(200).json(updateComposer3);
        }
        else
            return res.status(404).json("ID composition 3 introuvable ou invalide");
    } catch (error) {
        return res.status(500).json(error);
    }
}

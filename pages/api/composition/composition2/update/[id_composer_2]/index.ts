import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Composer_2 from "@/models/composition/Composer_2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const  { id_composer_2 } = req.query;
        const composer_2 = await prisma.composer_2.findUnique({
            where: { id_composer_2: id_composer_2?.toString() }
        });
        if(composer_2) {
            const composer_2Props : Composer_2 = req.body;
            const updateComposer_2 = await prisma.composer_2.update({
                where: { id_composer_2: composer_2.id_composer_2 },
                data: {
                    id_parcours: composer_2Props.id_parcours,
                    id_ue: composer_2Props.id_ue
                }
            });
            return res.status(201).json(updateComposer_2);
        }
        else 
            return res.status(404).json("ID composer_2 introuvable ou invalide");
    } catch (error) {
        return res.status(500).json(error);
    }
}

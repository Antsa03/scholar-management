import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'DELETE')
        return res.status(500).json("Méthode non autorisé");

    try {
        const { id_composer_3 } = req.query;
        const composer_3 = await prisma.composer_3.findUnique({
            where: { id_composer_3: id_composer_3?.toString() }
        });

        if(composer_3) {
            const deleteComposer3 = await prisma.composer_3.delete({
                where: { id_composer_3: composer_3.id_composer_3 }
            });
            return res.status(201).json(deleteComposer3);
        }
        else
            return res.status(404).json("ID composition 3 introuvable ou invalide");
    } catch (error) {
        return res.status(500).json(error);
    }
}

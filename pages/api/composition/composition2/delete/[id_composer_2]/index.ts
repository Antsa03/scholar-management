import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const  { id_composer_2 } = req.query;
        const composer_2 = await prisma.composer_2.findUnique({
            where: { id_composer_2: id_composer_2?.toString() }
        });
        if(composer_2) {
            const deleteComposer_2 = await prisma.composer_2.delete({
                where: { id_composer_2: composer_2.id_composer_2 }
            });
            return res.status(201).json(deleteComposer_2);
        }
        else 
            return res.status(404).json("ID composer_2 introuvable ou invalide");
    } catch (error) {
        return res.status(500).json(error);
    }
}

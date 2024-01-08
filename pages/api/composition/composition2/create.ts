import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Composer_2 from "@/models/composition/Composer_2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const composer_2Props : Composer_2 = req.body;
        const composer_2 = await prisma.composer_2.create({
            data: {
                id_composer_2: composer_2Props.id_composer_2,
                id_parcours: composer_2Props.id_parcours,
                id_ue: composer_2Props.id_ue
            }
        });
        return res.status(200).json(composer_2);
    } catch (error) {
        return res.status(500).json(error);
    }
}

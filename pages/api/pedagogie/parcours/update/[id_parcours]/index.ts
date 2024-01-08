import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'PUT')
        return res.status(500).json("Méthode non autorisé");
    try {
        const { id_parcours } = req.query;
        const parcours = await prisma.parcours.findUnique({
            where: { id_parcours: id_parcours?.toString() }
        });
        if(parcours) {
            const parcoursProps = req.body;
            const updateParcours = await prisma.parcours.update({
                where: { id_parcours: parcours.id_parcours },
                data :{
                    designation_parcours: parcoursProps.designation_parcours
                }
            });
            return res.status(200).json(updateParcours);
        } else
            return res.status(500).json("ID parcours introuvable ou invalide");
    } catch (error) {
        return res.status(500).json(error);
    }
}

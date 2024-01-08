import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const parcoursProps = req.body;
        const parcours = await prisma.parcours.create({
            data: {
                id_parcours: parcoursProps.id_parcours,
                designation_parcours: parcoursProps.designation_parcours
            }
        });
        return res.status(200).json(parcours);
    } catch(error) {
        return res.status(500).json(error);
    }
}

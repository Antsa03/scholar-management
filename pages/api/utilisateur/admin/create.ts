import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { Admin } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST")
        return res.status(500).json("Méthode non autorisé");

    else {
        try {
            const adminProps : Admin = req.body;
            const admin = await prisma.admin.create({
                data: {
                    id_admin: adminProps.id_admin,
                    fonction: adminProps.fonction,
                    id_utilisateur: adminProps.id_utilisateur
                }
            });
            return res.status(200).json(admin);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
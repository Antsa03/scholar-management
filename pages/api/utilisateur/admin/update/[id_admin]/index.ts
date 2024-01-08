import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { Admin } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "PUT") 
        return res.status(500).json("Méthode non autorisé");
    else {
        const { id_admin } = req.query;
        if(!id_admin || typeof id_admin !== "string" || id_admin.trim() === "")
            return res.status(404).json("id_admin non valide");
        else {
            try {
                const admin = await prisma.admin.findUnique({
                    where: { id_admin: id_admin }
                });
                if(admin) {
                    const adminProps : Admin = req.body;
                    const admin = await prisma.admin.update({
                        where: { id_admin: id_admin },
                        data: {
                            fonction: adminProps.fonction
                        }
                    });
                    return res.status(200).json(admin);
                } else {
                    return res.status(404).json("id_admin non trouvée");
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id_admin } = req.query;
    const admin = await prisma.admin.findUnique({
        where: { id_admin: id_admin?.toString() }
    });
    return res.status(200).json(admin);
}
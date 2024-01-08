import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "DELETE")
        return res.status(500).json("Méthode non autorisé");
    else {
        try {
            const { id_utilisateur } = req.query;
            if(id_utilisateur && typeof id_utilisateur === "string" && id_utilisateur.trim() !== "") {
                const utilisateur = await prisma.utilisateur.findUnique({
                    where: { id_utilisateur: id_utilisateur }
                });
                if(utilisateur) {
                    const deleteutilisateur = await prisma.utilisateur.delete({
                        where: { id_utilisateur: id_utilisateur }
                    });
                    return res.status(200).json(deleteutilisateur);
                } else {
                    res.status(404).json("Utilisateur non trouvé")
                }
            } else {
                // Gérer le cas où id_utilisateur est manquant ou vide
                return res.status(400).json({ message: "id_utilisateur invalide ou manquant" });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
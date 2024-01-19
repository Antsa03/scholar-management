import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { Utilisateur } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(500).json("Méthode non autorisé");
  else {
    const { id_utilisateur } = req.query;
    if (
      !id_utilisateur ||
      typeof id_utilisateur !== "string" ||
      id_utilisateur.trim() === ""
    )
      return res.status(404).json("id_utilisateur non valide");
    else {
      const utilisateur = await prisma.utilisateur.findUnique({
        where: { id_utilisateur: id_utilisateur },
      });
      if (utilisateur) {
        const utilisateurProps: Utilisateur = req.body;
        const utilisateur = await prisma.utilisateur.update({
          where: { id_utilisateur: id_utilisateur },
          data: {
            photo_profil: utilisateurProps.photo_profil,
            nom: utilisateurProps.nom.toUpperCase(),
            prenoms: utilisateurProps.prenoms,
            sexe: utilisateurProps.sexe,
            adresse: utilisateurProps.adresse,
            telephone: utilisateurProps.telephone,
            email: utilisateurProps.email,
          },
        });
        return res.status(200).json(utilisateur);
      } else {
        return res.status(404).json("id_utilisateur non trouvée");
      }
    }
  }
}

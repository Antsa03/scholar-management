import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Admin from "@/models/utilisateur/listage/Admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.admin.findMany({
      include: {
        utilisateur: true,
      },
      orderBy: {
        id_admin: "asc",
      },
    });
    const admins: Admin[] = response.map((admin) => {
      return {
        id_utilisateur: admin.utilisateur.id_utilisateur,
        photo_profil: admin.utilisateur.photo_profil,
        nom: admin.utilisateur.nom,
        prenoms: admin.utilisateur.prenoms,
        sexe: admin.utilisateur.sexe,
        adresse: admin.utilisateur.adresse,
        telephone: admin.utilisateur.telephone,
        email: admin.utilisateur.email,
        mot_de_passe: admin.utilisateur.mot_de_passe,
        id_admin: admin.id_admin,
        fonction: admin.fonction,
      };
    });
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(500).json(error);
  }
}

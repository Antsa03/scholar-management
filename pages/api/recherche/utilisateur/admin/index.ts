import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Admin from "@/models/utilisateur/listage/Admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search_value: string = req.body;
    const recherche = await prisma.admin.findMany({
      include: {
        utilisateur: true,
      },
      where: {
        OR: [
          {
            id_admin: {
              contains: search_value.trim(),
            },
          },
          {
            id_utilisateur: {
              contains: search_value.trim(),
            },
          },
          {
            fonction: {
              contains: search_value.trim(),
            },
          },
          {
            utilisateur: {
              nom: {
                contains: search_value.toUpperCase(),
              },
            },
          },
          {
            utilisateur: {
              prenoms: {
                contains: search_value.trim(),
              },
            },
          },
          {
            utilisateur: {
              email: {
                contains: search_value.trim(),
              },
            },
          },
        ],
      },
      orderBy: {
        id_admin: "asc",
      },
    });
    const admins: Admin[] = recherche.map((admin) => {
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

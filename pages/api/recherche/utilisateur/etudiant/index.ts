import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Etudiant from "@/models/utilisateur/listage/Etudiant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const search_value: string = req.body;
    const recherche = await prisma.etudiant.findMany({
      include: {
        utilisateur: true,
      },
      where: {
        OR: [
          {
            num_matricule: {
              contains: search_value.trim(),
            },
          },
          {
            utilisateur: {
              nom: {
                contains: search_value.toUpperCase().trim(),
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
              telephone: {
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
        num_matricule: "asc",
      },
    });

    const etudiants: Etudiant[] = recherche.map((etudiant) => {
      return {
        id_utilisateur: etudiant.utilisateur.id_utilisateur,
        photo_profil: etudiant.utilisateur.photo_profil,
        nom: etudiant.utilisateur.nom,
        prenoms: etudiant.utilisateur.prenoms,
        sexe: etudiant.utilisateur.sexe,
        adresse: etudiant.utilisateur.adresse,
        telephone: etudiant.utilisateur.telephone,
        email: etudiant.utilisateur.email,
        mot_de_passe: etudiant.utilisateur.mot_de_passe,
        num_matricule: etudiant.num_matricule,
        date_naissance: etudiant.date_naissance.toLocaleDateString(),
        lieu_naissance: etudiant.lieu_naissance,
        nationalite: etudiant.nationalite,
        civilite: etudiant.civilite,
      };
    });

    return res.status(200).json(etudiants);
  } catch (error) {
    return res.status(500).json(error);
  }
}

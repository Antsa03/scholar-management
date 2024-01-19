import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await prisma.information.findMany({
      include: {
        etudiant: {
          include: {
            utilisateur: true,
          },
        },
        observation: true,
        calendrier_5: true,
        niveau: true,
      },
      orderBy: {
        id_information: "asc",
      },
    });
    const information = response.map((info) => {
      return {
        num_matricule: info.etudiant.num_matricule,
        photo_profil: info.etudiant.utilisateur.photo_profil,
        nom: info.etudiant.utilisateur.nom,
        prenoms: info.etudiant.utilisateur.prenoms,
        sexe: info.etudiant.utilisateur.sexe,
        date_naissance: info.etudiant.date_naissance,
        lieu_naissance: info.etudiant.lieu_naissance,
        nationalite: info.etudiant.nationalite,
        adresse: info.etudiant.utilisateur.adresse,
        telephone: info.etudiant.utilisateur.telephone,
        email: info.etudiant.utilisateur.email,
        annee_universitaire: info.annee_universitaire_5,
        id_niveau: info.id_niveau,
        niveau: info.niveau.designation_niveau,
        groupe: info.groupe,
        id_obs: info.id_obs,
        admis: info.observation.admis ? "Oui" : "Non",
        situation: info.observation.situation,
        date_insc: info.observation.date_insc,
        date_arret: info.observation.date_arret,
      };
    });
    return res.status(200).json(information);
  } catch (error) {
    return res.status(500).json(error);
  }
}

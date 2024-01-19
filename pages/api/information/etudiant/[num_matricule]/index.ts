import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { num_matricule } = req.query;

    const response = await prisma.information.findMany({
      where: { num_matricule: num_matricule?.toString() },
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
    });
    if (response) {
      const information = response.map((info) => {
        let passant_val = "";
        let redoublant_val = "";
        if (info.etudiant.utilisateur.sexe === "Masculin") {
          passant_val = "Passant";
          redoublant_val = "Redoublant";
        } else {
          passant_val = "Passante";
          redoublant_val = "Redoublante";
        }
        return {
          id_information: info.id_information,
          num_matricule: info.num_matricule,
          photo_profil: info.etudiant.utilisateur.photo_profil,
          nom: info.etudiant.utilisateur.nom,
          prenoms: info.etudiant.utilisateur.prenoms,
          sexe: info.etudiant.utilisateur.sexe,
          date_naissance: info.etudiant.date_naissance
            .toLocaleDateString()
            .slice(0, 10),
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
          admis: info.observation.admis ? passant_val : redoublant_val,
          situation: info.observation.situation,
          date_insc: info.observation.date_insc
            .toLocaleDateString()
            .slice(0, 10),
          date_arret:
            info.observation.date_arret !== null
              ? info.observation.date_arret.toLocaleDateString().slice(0, 10)
              : null,
        };
      });
      return res.status(200).json(information);
    } else return res.status(404).json("Information introuvable");
  } catch (error) {
    return res.status(500).json(error);
  }
}

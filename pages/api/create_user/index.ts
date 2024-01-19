import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const utilisateurs: Utilisateur[] = req.body;
  const createPromises = utilisateurs.map(async (utilisateur: Utilisateur) => {
    let passwordHashed = "";
    try {
      passwordHashed = await bcrypt.hash(utilisateur.mot_de_passe, 10);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to hash password");
    }
    return prisma.utilisateur.create({
      data: {
        id_utilisateur: utilisateur.id_utilisateur,
        photo_profil: utilisateur.photo_profil,
        nom: utilisateur.nom,
        prenoms: utilisateur.prenoms,
        sexe: utilisateur.sexe,
        adresse: utilisateur.adresse,
        telephone: utilisateur.telephone,
        email: utilisateur.email,
        mot_de_passe: passwordHashed,
      },
    });
  });
  try {
    const result = await Promise.all(createPromises);
    return res
      .status(200)
      .json({ message: "Tous les utilisateurs sont créés" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the users" });
  }
}

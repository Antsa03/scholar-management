import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const password = await bcrypt.hash("StagiaireEtude", 10);
  const utilisateur = await prisma.utilisateur.upsert({
    where: { email: "admindefault@gmail.com" },
    update: {},
    create: {
      id_utilisateur: "999A",
      photo_profil: "user.png",
      nom: "Stagiaire",
      prenoms: "Etude",
      sexe: "Masculin",
      adresse: "Adresse",
      telephone: "+261344027527",
      email: "stagiaire.etude@esti.mg",
      mot_de_passe: password,
    },
  });
  if (utilisateur) {
    const admin = await prisma.admin.create({
      data: {
        id_admin: "999AN",
        fonction: "Stagiaire",
        id_utilisateur: "999A",
      },
    });
  }
  console.log(utilisateur);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

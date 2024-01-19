import prisma from "@/prisma/client";
export async function sql_injection(id_utilisateur: string) {
  const utilisateur =
    await prisma.$queryRaw`SELECT * FROM "Utilisateur" WHERE id_utilisateur = ${id_utilisateur}`;
  return utilisateur;
}

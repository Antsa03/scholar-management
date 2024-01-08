import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProviders({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password }: any = credentials;

        let userRole: string = "";
        let userId: string = "";

        if (!credentials) return null;
        const user = await prisma.utilisateur.findFirst({
          where: { email: email },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.mot_de_passe);
        if (!isValid) return null;

        const admin = await prisma.admin.findFirst({
          where: { id_utilisateur: user?.id_utilisateur },
        });

        const enseignant = await prisma.enseignant.findFirst({
          where: { id_utilisateur: user?.id_utilisateur },
        });

        const etudiant = await prisma.etudiant.findFirst({
          where: { id_utilisateur: user?.id_utilisateur },
        });

        const responsable_legal = await prisma.responsable_legal.findFirst({
          where: { id_utilisateur: user?.id_utilisateur },
        });

        if (admin) {
          userRole = "Administrateur";
          userId = admin.id_admin;
        }

        if (enseignant) {
          userRole = "Enseignant";
          userId = enseignant.id_enseignant;
        }

        if (etudiant) {
          userRole = "Etudiant";
          userId = etudiant.num_matricule;
        }

        if (responsable_legal) {
          userRole = "Responsable légal";
          userId = responsable_legal.id_responsable_legal;
        }

        return {
          id: userId,
          sub: user.id_utilisateur,
          email: user.email,
          userName: user.email,
          name: user.nom + " " + user.prenoms,
          image: user.photo_profil,
          role: userRole,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return { ...session, ...token };
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);

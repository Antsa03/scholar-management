"use client";
import React, { useEffect } from "react";
import Login from "./login";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Auth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      switch (session.user.role) {
        case "Etudiant":
          router.push("/etudiant/accueil");
          break;
        case "Enseignant":
          router.push("/accueil");
          break;
        case "Responsable légal":
          router.push("/accueil");
          break;
        default:
          router.push("/accueil");
      }
    }
  }, [status, session]);

  if (status === "loading") return <h1>Chargement</h1>;
  if (!session) return <Login />;
  return null;
}

export default Auth;

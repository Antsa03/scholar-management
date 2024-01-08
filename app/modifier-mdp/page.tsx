"use client";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { ChevronsRight } from "react-feather";

interface PasswordUpdate {
  old_password: string;
  password: string;
  confirm_password: string;
}

function UpdatePassword() {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [utilisateur, setUtilisateur] = useState<Utilisateur>();
  const fetchUtilisateur = async () => {
    try {
      const response = await fetch(`/api/utilisateur/${session.user.sub}`);
      const data = await response.json();
      setUtilisateur(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) fetchUtilisateur();
  }, [session]);

  const updatePassword_form = useForm<PasswordUpdate>({
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleUpdatePassword: SubmitHandler<PasswordUpdate> = async (
    password_args
  ) => {
    try {
      let isValid = false;
      if (utilisateur) {
        isValid = await bcrypt.compare(
          password_args.old_password,
          utilisateur.mot_de_passe
        );
      }
      if (isValid) {
        if (password_args.password === password_args.confirm_password) {
          const response = await fetch(
            `/api/reset-password/${session.user.email}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(password_args),
            }
          );
          if (response.ok) {
            alert("Mot de passe modifié avec succès");
            if (session.user.role === "Administrateur") router.push("/accueil");
            else if (session.user.role === "Etudiant")
              router.push("/etudiant/accueil");
          } else {
            alert("Echec de la modification");
            console.error(response);
          }
        } else alert("la confirmation de mot de passe n'est pas valide");
      } else alert("L'ancien mot de passe est incorrecte");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="section-container">
      <div className="main-container">
        {" "}
        <div className=" ml-32 mb-5">
          <h1 className="h1 flex flex-row items-center gap-2 ">
            <ChevronsRight size={28} strokeWidth={3}></ChevronsRight>
            Modifier votre mot de passe
          </h1>
        </div>
        <form
          onSubmit={updatePassword_form.handleSubmit(handleUpdatePassword)}
          className="ml-32 container-col-div-input"
        >
          <div className="container-input">
            <label htmlFor="old_password" className="label">
              Ancien password
            </label>
            <input
              type="text"
              {...updatePassword_form.register("old_password")}
              className="input-form"
            />
          </div>
          <div className="container-input">
            <label htmlFor="password" className="label">
              Nouveau mot de passe
            </label>
            <input
              type="text"
              {...updatePassword_form.register("password")}
              className="input-form"
            />
          </div>
          <div className="container-input">
            <label htmlFor="confirm_password" className="label">
              Confirmation du mot de passe
            </label>
            <input
              type="text"
              {...updatePassword_form.register("confirm_password")}
              className="input-form"
            />
          </div>
          <button type="submit" className="button-add-info">
            Confirmer
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;

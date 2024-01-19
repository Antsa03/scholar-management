"use client";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { ChevronsRight } from "react-feather";
import { showSwal } from "@/utils/swal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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

  const { formState } = updatePassword_form;
  const { errors } = formState;

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
            showSwal(
              "Pour information",
              "Mot de passe modifié avec succès",
              "success"
            );
            if (session.user.role === "Administrateur") router.push("/accueil");
            else if (session.user.role === "Etudiant")
              router.push("/etudiant/accueil");
          } else {
            alert("Echec de la modification");
            console.error(response);
          }
        } else
          showSwal(
            "Pour information",
            "la confirmation de mot de passe n'est pas valide",
            "error"
          );
      } else
        showSwal(
          "Pour information",
          "L'ancien mot de passe est incorrecte",
          "error"
        );
    } catch (error) {
      console.error(error);
    }
  };

  const [showOldpassword, setShowOldpassword] = useState(false);

  const handleShowOldpassword = () => {
    setShowOldpassword(!showOldpassword);
  };

  const [showPassword, setShowpassword] = useState(false);

  const handleShowPassword = () => {
    setShowpassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <label htmlFor="password" className="label">
              Ancien mot de passe *
            </label>
            <div className="relative m-0 p-0">
              <input
                type={showOldpassword ? "text" : "password"}
                {...updatePassword_form.register("old_password", {
                  required: "L'ancien mot de passe est obligatoire",
                })}
                className={`input-form ${
                  errors?.old_password?.message ? "hasError" : ""
                }`}
                maxLength={60}
                autoComplete="off"
              />
              <FontAwesomeIcon
                onClick={handleShowOldpassword}
                icon={showOldpassword ? faEyeSlash : faEye}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black"
              />
            </div>
            <p className="p-error">{errors?.old_password?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="password" className="label">
              Nouveau mot de passe *
            </label>
            <div className="relative m-0 p-0">
              <input
                type={showPassword ? "text" : "password"}
                {...updatePassword_form.register("password", {
                  required: "Le nouveau mot de passe est obligatoire",
                  minLength: {
                    value: 8,
                    message:
                      "Le nouveau mot de passe doit contenir au moins 8 caractères",
                  },
                })}
                className={`input-form ${
                  errors?.password?.message ? "hasError" : ""
                }`}
                maxLength={60}
                autoComplete="off"
              />
              <FontAwesomeIcon
                onClick={handleShowPassword}
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black"
              />
            </div>
            <p className="p-error">{errors?.password?.message}</p>
          </div>
          <div className="container-input">
            <label htmlFor="confirm_password" className="label">
              Confirmation de mot de passe *
            </label>
            <div className="relative m-0 p-0">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...updatePassword_form.register("confirm_password", {
                  required: "La confirmation de passe est obligatoire",
                })}
                className={`input-form ${
                  errors?.confirm_password?.message ? "hasError" : ""
                }`}
                maxLength={60}
                autoComplete="off"
              />
              <FontAwesomeIcon
                onClick={handleShowConfirmPassword}
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black"
              />
            </div>
            <p className="p-error">{errors?.confirm_password?.message}</p>
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

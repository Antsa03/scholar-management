"use client";
import AdminForm from "@/views/utilisateur/admin/AdminForm";
import { useEffect, useState } from "react";
import deleteUser from "@/utils/deleteUser";
import { SubmitHandler, UseFormTrigger, useForm } from "react-hook-form";
import Admin from "@/models/utilisateur/Admin";
import Utilisateur from "@/models/utilisateur/Utilisateur";
import { showToast, showSwal } from "@/utils/swal";

interface AdministrateurFormProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
  trigger_utilisateur_form: UseFormTrigger<Utilisateur>;
}

function AdministrateurFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
  trigger_utilisateur_form,
}: AdministrateurFormProps) {
  //Tout ce qui concerne l'admin
  const { register, handleSubmit, setValue, formState, trigger } =
    useForm<Admin>({
      defaultValues: {
        id_admin: "",
        fonction: "",
        id_utilisateur: "",
      },
    });

  const { errors } = formState;

  const handleAdmin: SubmitHandler<Admin> = async (admin) => {
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });
      if (response.ok) {
        //show dialogue alerte
        showToast("Utilisateur de type admin crée avec succès", "", "success");
        router.push("/utilisateur/admin");
      } else {
        await deleteUser(id_utilisateur);
        showSwal(
          "Erreur",
          "Echec de l'ajout de l'administrateur, veuillez vérifier les champs!",
          "error"
        );
        console.error(response);
      }
    } catch (error) {
      await deleteUser(id_utilisateur);
      showSwal(
        "Erreur",
        "Echec de l'ajout de l'administrateur, veuillez vérifier les champs!",
        "error"
      );
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("id_utilisateur", id_utilisateur);
  }, [id_utilisateur, setValue]);

  return (
    <AdminForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(handleAdmin)}
      errors={errors}
      trigger_utilisateur_form={trigger_utilisateur_form}
    />
  );
}

export default AdministrateurFormulaire;

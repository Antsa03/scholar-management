"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import UEForm from "@/views/unite_enseignement/UEForm";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";
import { showSwal } from "@/utils/swal";

function UniteEnseignementAjout() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Unite_enseignement>({
    defaultValues: {
      id_ue: "",
      designation_ue: "",
      credit: "",
      semestre_ue: "",
      description_ue: "",
    },
  });

  const onSubmit: SubmitHandler<Unite_enseignement> = async (
    unite_enseignement
  ) => {
    try {
      const response = await fetch(
        "/api/enseignement/unite_enseignement/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(unite_enseignement),
        }
      );
      if (response.ok) {
        showSwal("Unité d'enseignement créé avec succès", "", "success");
        router.push("/unite_enseignement");
      } else {
        showSwal("Echec de la création de l'unité d'enseignement", "", "error");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UEForm
      isUpdate={false}
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
    />
  );
}

export default UniteEnseignementAjout;

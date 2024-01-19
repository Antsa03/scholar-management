"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NiveauForm from "@/views/pedagogie/niveau/NiveauForm";
import ParcoursForm from "@/views/pedagogie/parcours/ParcoursForm";
import { SubmitHandler, useForm } from "react-hook-form";
import Niveau from "@/models/pedagogie/Niveau";
import Parcours from "@/models/pedagogie/Parcours";
import { showSwal } from "@/utils/swal";

function PedagogieEdit() {
  const params = useParams();

  const router = useRouter();

  // Tout ce qui concerne le niveau
  // Tout ce qui concerne le niveau
  const niveau_form = useForm<Niveau>({
    defaultValues: {
      id_niveau: "",
      designation_niveau: "",
    },
  });

  const fetchNiveau = async () => {
    try {
      const response = await fetch(`/api/pedagogie/niveau/${params?.id}`);
      const data = await response.json();
      niveau_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNiveau: SubmitHandler<Niveau> = async (niveau) => {
    try {
      const response = await fetch(
        `/api/pedagogie/niveau/update/${params?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(niveau),
        }
      );
      if (response.ok) {
        showSwal("Niveau modifié avec succès", "", "success");
        router.push("/pedagogie");
      } else {
        showSwal("Echec de la modification", "", "error");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne parcours
  const parcours_form = useForm<Parcours>({
    defaultValues: {
      id_parcours: "",
      designation_parcours: "",
    },
  });

  const fetchParcours = async () => {
    try {
      const response = await fetch(`/api/pedagogie/parcours/${params?.id}`);
      const data = await response.json();
      parcours_form.reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateParcours: SubmitHandler<Parcours> = async (parcours) => {
    try {
      const response = await fetch(
        `/api/pedagogie/parcours/update/${params?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parcours),
        }
      );
      if (response.ok) {
        showSwal("Pour information", "Parcours modifié avec succès", "success");
        router.push("/pedagogie");
      } else {
        showSwal("Pour information", "Echec de modification parcours", "error");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNiveau();
    fetchParcours();
  }, [params?.id]);

  return (
    <>
      <NiveauForm
        isUpdate={true}
        register={niveau_form.register}
        handleSubmit={niveau_form.handleSubmit(handleUpdateNiveau)}
        errors={niveau_form.formState.errors}
      />
      <ParcoursForm
        isUpdate={true}
        register={parcours_form.register}
        handleSubmit={parcours_form.handleSubmit(handleUpdateParcours)}
        errors={parcours_form.formState.errors}
      />
    </>
  );
}

export default PedagogieEdit;

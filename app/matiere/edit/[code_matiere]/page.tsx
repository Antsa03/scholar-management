"use client";
import Matiere from "@/models/enseignement/Matiere";
import Enseignant from "@/models/utilisateur/listage/Enseignant";
import { showSwal } from "@/utils/swal";
import MatiereForm from "@/views/matiere/MatiereForm";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function MatiereAjout() {
  const params = useParams();

  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Matiere>({
    defaultValues: {
      code_matiere: "",
      designation_matiere: "",
      coeff: "",
      credit_matiere: "",
      v_horaire_matiere: "",
      description: "",
      id_enseignant: "",
    },
  });

  const fetchMatiere = async () => {
    try {
      const response = await fetch(
        `/api/enseignement/matiere/${params?.code_matiere}`
      );
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [enseignants, setEnseignant] = useState<Array<Enseignant>>([]);
  const fetchEnseignants = async () => {
    try {
      const response = await fetch("/api/utilisateur/enseignant");
      const data = await response.json();
      setEnseignant(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnseignants();
  }, []);

  useEffect(() => {
    fetchMatiere();
  }, [params?.code_matiere, enseignants]);

  const handleUpdateMatiere: SubmitHandler<Matiere> = async (matiere) => {
    try {
      const response = await fetch(
        `/api/enseignement/matiere/update/${params?.code_matiere}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(matiere),
        }
      );
      if (response.ok) {
        showSwal("Matière modifiée avec succès", "", "success");
        router.push("/matiere");
      } else {
        showSwal("Echec de la création de matière", "", "error");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MatiereForm
      isUpdate
      register={register}
      enseignants={enseignants}
      handleSubmit={handleSubmit(handleUpdateMatiere)}
      errors={errors}
    />
  );
}

export default MatiereAjout;

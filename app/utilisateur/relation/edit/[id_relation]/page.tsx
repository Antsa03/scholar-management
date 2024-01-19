"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Etudiant from "@/models/utilisateur/listage/Etudiant";
import Responsable_legal from "@/models/utilisateur/listage/Responsable_legal";
import RelationForm from "@/views/utilisateur/relation/RelationForm";
import { SubmitHandler, useForm } from "react-hook-form";
import Relation from "@/models/utilisateur/Relation";

function RelationEdit() {
  const params = useParams();

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/utilisateur/relation");
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Relation>({
    defaultValues: {
      id_relation: "",
      id_responsable_legal: "",
      num_matricule: "",
    },
  });
  const fetchRelation = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/relation/${params?.id_relation}`
      );
      const data = await response.json();
      reset(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRelation();
  }, [params?.id_relation]);

  const [etudiants, setEtudiants] = useState<Array<Etudiant>>([]);

  const fetchEtudiants = async () => {
    try {
      const response = await fetch("/api/utilisateur/etudiant");
      const data = await response.json();
      setEtudiants(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [responsable_legals, setResponsableLegals] = useState<
    Array<Responsable_legal>
  >([]);
  const fetchResponsableLegals = async () => {
    try {
      const response = await fetch("/api/utilisateur/responsable_legal");
      const data = await response.json();
      setResponsableLegals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResponsableLegals();
    fetchEtudiants();
  }, []);

  const handleRelation: SubmitHandler<Relation> = async (relation) => {
    try {
      const response = await fetch(
        `/api/utilisateur/relation/update/${params?.id_relation}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(relation),
        }
      );
      if (response.ok) {
        alert("Relation modifié avec succès");
        handleNavigation();
      } else {
        alert("Echec de modification");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RelationForm
      isUpdate
      register={register}
      responsable_legals={responsable_legals}
      etudiants={etudiants}
      onSubmit={handleSubmit(handleRelation)}
      errors={errors}
    />
  );
}

export default RelationEdit;
